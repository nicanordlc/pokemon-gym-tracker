"use client";

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import clsx from "clsx";
import { FaPlay, FaPause, FaStop, FaUndo } from "react-icons/fa";
import { api } from "~/trpc/react";

export function SessionTimer({ sessionPath }: { sessionPath: string }) {
  const getSession = api.session.get.useQuery(
    { sessionId: sessionPath },
    { refetchInterval: 1000 },
  );

  const updateTimer = api.session.updateTimer.useMutation();

  const [initialSeconds, setInitialSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  // Time components for editing
  const [editHours, setEditHours] = useState(0);
  const [editMinutes, setEditMinutes] = useState(0);
  const [editSeconds, setEditSeconds] = useState(0);

  // Sync DB state to local state
  useEffect(() => {
    if (!getSession.data) return;

    const { timerState, timerStartTime, timerDuration } = getSession.data;
    
    setInitialSeconds(timerDuration);
    
    if (timerState === "PLAYING" && timerStartTime) {
      setIsRunning(true);
      setIsEditing(false);
      
      const elapsedMilliseconds = Date.now() - timerStartTime.getTime();
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      
      if (timerDuration > 0) {
        // Countdown
        const remaining = Math.max(0, timerDuration - elapsedSeconds);
        setSeconds(remaining);
        if (remaining === 0 && isRunning) {
          setIsRunning(false);
        }
      } else {
        // Stopwatch
        setSeconds(elapsedSeconds);
      }
    } else {
      setIsRunning(false);
      
      // Only set seconds if DB is paused and we're not currently editing
      if (!isEditing || timerDuration > 0) {
          setSeconds(timerDuration);
      }
    }
  }, [getSession.data]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (initialSeconds > 0) {
            // Countdown mode
            if (prev <= 1) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          } else {
            // Stopwatch mode
            return prev + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, initialSeconds]);

  const toggleTimer = () => {
    // If starting from completely stopped and zero, it's a stopwatch
    let currentInitial = initialSeconds;
    if (!isRunning && seconds === 0 && initialSeconds === 0) {
      setSeconds(0);
    }
    
    const newState = !isRunning;
    
    updateTimer.mutate({
      sessionId: sessionPath,
      timerState: newState ? "PLAYING" : "STOPPED",
      timerStartTime: newState ? new Date() : null,
      timerDuration: newState ? currentInitial : seconds,
    });

    setIsRunning(newState);
    setIsEditing(false);
  };

  const resetTimer = () => {
    updateTimer.mutate({
      sessionId: sessionPath,
      timerState: "STOPPED",
      timerStartTime: null,
      timerDuration: initialSeconds,
    });
    
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const applyEdit = () => {
    const total = editHours * 3600 + editMinutes * 60 + editSeconds;
    
    updateTimer.mutate({
      sessionId: sessionPath,
      timerState: "STOPPED",
      timerStartTime: null,
      timerDuration: total,
    });

    setInitialSeconds(total);
    setSeconds(total);
    setIsEditing(false);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Rnd
      default={{
        x: 20,
        y: 20,
        width: 220,
        height: 120,
      }}
      minWidth={200}
      minHeight={100}
      bounds="window"
      className="z-50 !fixed"
    >
      <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/90 shadow-2xl backdrop-blur-md">
        {/* Drag handle */}
        <div className="flex h-6 w-full cursor-move items-center justify-center bg-zinc-800/80">
          <div className="h-1 w-12 rounded-full bg-zinc-600"></div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center p-2">
          {isEditing && !isRunning ? (
            <div className="flex items-center gap-1 text-zinc-100">
              <input
                type="number"
                min="0"
                value={editHours}
                onChange={(e) => setEditHours(parseInt(e.target.value) || 0)}
                className="w-10 rounded border border-zinc-700 bg-zinc-800 p-1 text-center text-sm outline-none focus:border-blue-500"
              />
              <span>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={editMinutes}
                onChange={(e) => setEditMinutes(parseInt(e.target.value) || 0)}
                className="w-10 rounded border border-zinc-700 bg-zinc-800 p-1 text-center text-sm outline-none focus:border-blue-500"
              />
              <span>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={editSeconds}
                onChange={(e) => setEditSeconds(parseInt(e.target.value) || 0)}
                className="w-10 rounded border border-zinc-700 bg-zinc-800 p-1 text-center text-sm outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <div
              className="cursor-pointer text-4xl font-bold tracking-wider text-zinc-100 transition-colors hover:text-blue-400"
              onClick={() => {
                if (!isRunning) setIsEditing(true);
              }}
            >
              {formatTime(seconds)}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 border-t border-zinc-800 bg-zinc-950/50 p-2">
          {isEditing && !isRunning ? (
            <button
              onClick={applyEdit}
              className="rounded bg-blue-600 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Set
            </button>
          ) : (
            <>
              <button
                onClick={toggleTimer}
                className={clsx(
                  "flex size-8 items-center justify-center rounded-full transition-colors",
                  isRunning
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-green-500/20 text-green-400 hover:bg-green-500/30",
                )}
              >
                {isRunning ? <FaPause size={12} /> : <FaPlay size={12} />}
              </button>
              <button
                onClick={resetTimer}
                className="flex size-8 items-center justify-center rounded-full bg-zinc-700/50 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
              >
                <FaUndo size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </Rnd>
  );
}

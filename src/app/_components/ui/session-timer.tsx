"use client";

import { useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";
import clsx from "clsx";
import { FaPlay, FaPause, FaStop, FaUndo } from "react-icons/fa";
import { api } from "~/trpc/react";

export function SessionTimer({ sessionPath, isLeader = false }: { sessionPath: string, isLeader?: boolean }) {
  const getSession = api.session.get.useQuery(
    { sessionId: sessionPath },
    { refetchInterval: 1000 },
  );

  const updateTimer = api.session.updateTimer.useMutation();

  const [initialSeconds, setInitialSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const hasLoadedRef = useRef(false);

  // Sync DB state to local state
  useEffect(() => {
    if (!getSession.data) return;

    const { timerState, timerStartTime, timerDuration } = getSession.data;

    if (timerState === "PLAYING" && timerStartTime) {
      setIsRunning(true);

      const elapsedMilliseconds = Date.now() - timerStartTime.getTime();
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

      if (timerDuration > 0) {
        // Countdown
        setSeconds(Math.max(0, timerDuration - elapsedSeconds));
      } else {
        // Stopwatch
        setSeconds(elapsedSeconds);
      }
      setInitialSeconds(timerDuration);
      hasLoadedRef.current = true;
    } else {
      setIsRunning(false);

      // Update local time from DB only if we are a follower or if it's the first load.
      // The leader's local input state stays the source of truth while stopped.
      if (!isLeader || !hasLoadedRef.current) {
        setSeconds(timerDuration);
        setInitialSeconds(timerDuration);
        hasLoadedRef.current = true;
      }
    }
  }, [getSession.data, isLeader]);

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
    let currentInitial = initialSeconds;
    let currentSeconds = seconds;

    // If starting from completely stopped and zero, it's a stopwatch
    if (!isRunning && seconds === 0 && initialSeconds === 0) {
      currentSeconds = 0;
      setSeconds(0);
    }

    if (!isRunning) {
      currentInitial = seconds; // Lock in whatever the user typed
      setInitialSeconds(seconds);
    }

    const newState = !isRunning;

    updateTimer.mutate({
      sessionId: sessionPath,
      timerState: newState ? "PLAYING" : "STOPPED",
      timerStartTime: newState ? new Date() : null,
      timerDuration: newState ? currentInitial : currentSeconds,
    });

    setIsRunning(newState);
  };

  const resetTimer = () => {
    updateTimer.mutate({
      sessionId: sessionPath,
      timerState: "STOPPED",
      timerStartTime: null,
      timerDuration: 0,
    });

    setIsRunning(false);
    setSeconds(0);
    setInitialSeconds(0);
  };

  const handleUpdateSeconds = (newSeconds: number) => {
    if (isRunning || !isLeader) return;
    setSeconds(newSeconds);
    setInitialSeconds(newSeconds);
  };

  const handleBlur = () => {
    if (isRunning || !isLeader) return;
    // Auto-save the edits so other viewers can see the configured time
    updateTimer.mutate({
      sessionId: sessionPath,
      timerState: "STOPPED",
      timerStartTime: null,
      timerDuration: seconds,
    });
  };

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const canEdit = isLeader && !isRunning;

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
          <div className="flex items-center text-4xl font-bold tracking-wider text-zinc-100">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              readOnly={!canEdit}
              value={h.toString().padStart(2, "0")}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/\D/g, "").slice(-2)) || 0;
                handleUpdateSeconds(val * 3600 + m * 60 + s);
              }}
              onBlur={handleBlur}
              className={clsx(
                "w-[1.5em] bg-transparent text-center outline-none transition-colors selection:bg-blue-500/30",
                canEdit ? "focus:text-blue-400 cursor-text" : "cursor-default pointer-events-none"
              )}
            />
            <span className="opacity-50 pb-1">:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              readOnly={!canEdit}
              value={m.toString().padStart(2, "0")}
              onChange={(e) => {
                let val = parseInt(e.target.value.replace(/\D/g, "").slice(-2)) || 0;
                if (val > 59) val = 59;
                handleUpdateSeconds(h * 3600 + val * 60 + s);
              }}
              onBlur={handleBlur}
              className={clsx(
                "w-[1.5em] bg-transparent text-center outline-none transition-colors selection:bg-blue-500/30",
                canEdit ? "focus:text-blue-400 cursor-text" : "cursor-default pointer-events-none"
              )}
            />
            <span className="opacity-50 pb-1">:</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              readOnly={!canEdit}
              value={s.toString().padStart(2, "0")}
              onChange={(e) => {
                let val = parseInt(e.target.value.replace(/\D/g, "").slice(-2)) || 0;
                if (val > 59) val = 59;
                handleUpdateSeconds(h * 3600 + m * 60 + val);
              }}
              onBlur={handleBlur}
              className={clsx(
                "w-[1.5em] bg-transparent text-center outline-none transition-colors selection:bg-blue-500/30",
                canEdit ? "focus:text-blue-400 cursor-text" : "cursor-default pointer-events-none"
              )}
            />
          </div>
        </div>

        {/* Controls */}
        {isLeader && (
          <div className="flex items-center justify-center gap-4 border-t border-zinc-800 bg-zinc-950/50 p-2">
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
          </div>
        )}
      </div>
    </Rnd>
  );
}

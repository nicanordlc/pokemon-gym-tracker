"use client";

import { Badges } from "~/app/_components/ui/badges";
import { JoinTrainer } from "~/app/_components/ui/join-trainer";
import { Title } from "~/app/_components/title";
import { usePathname } from "next/navigation";
import { useApp } from "~/app/_hooks/app";
import { useEffect } from "react";
import { TrainersBadges } from "~/app/_components/ui/trainers-badges";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";

export default function Session() {
  const { setSession } = useApp();
  const sessionId = usePathname().split("/")[1] ?? "";
  const { trainer: localTrainer } = useTrainer();
  const getTrainers = api.trainer.getTrainers.useQuery(
    { sessionId },
    { refetchInterval: 1000 },
  );

  const showTrainers = localTrainer.id || getTrainers.isSuccess;

  useEffect(() => {
    setSession({ id: sessionId });
  }, [sessionId]);

  return (
    <main className="grid grid-cols-1 items-center justify-items-center gap-y-4 ">
      <Title className="text-center" />

      <Badges init />

      <JoinTrainer
        className="min-w-[280px] sm:w-[540px]"
        inputClassName="grow min-h-[40px]"
        sessionId={sessionId}
        iconSize={24}
      />

      {showTrainers ? (
        <TrainersBadges
          localTrainer={localTrainer}
          trainers={getTrainers.data}
        />
      ) : (
        <Badges title />
      )}
    </main>
  );
}

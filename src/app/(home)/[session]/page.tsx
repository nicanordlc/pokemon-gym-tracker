"use client";

import { Badges } from "~/app/_components/ui/badges";
import { JoinTrainer } from "~/app/_components/ui/join-trainer";
import { Title } from "~/app/_components/title";
import { useTrainer } from "~/app/_hooks/trainer";
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";

export default function Session() {
  const { trainer, trainerMounted } = useTrainer();
  const trainername = trainerMounted ? trainer.name : "";
  const sessionId = usePathname().split("/")[1] ?? "";

  return (
    <div className="grid gap-4">
      <Title />

      <div className="flex items-center gap-4">
        <Badges init />

        <JoinTrainer sessionId={sessionId} />
      </div>

      {/* @TODO: modify trainer's badges from db */}
      <Badges
        trainername={trainername}
        red={[1]}
        emerald={[1]}
        crystal={[2, 3, 1]}
      />
    </div>
  );
}

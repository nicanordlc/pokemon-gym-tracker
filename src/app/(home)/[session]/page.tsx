"use client";

import { Badges } from "~/app/_components/ui/badges";
import { JoinTrainer } from "~/app/_components/ui/join-trainer";
import { Title } from "~/app/_components/title";
import { useTrainer } from "~/app/_hooks/trainer";
import { usePathname } from "next/navigation";
import { useApp } from "~/app/_hooks/app";
import { parseTrainerBadges } from "~/utils/parse-trainer-badges";

export default function Session() {
  const { trainer, mounted } = useTrainer();
  const { setSession } = useApp();

  const trainername = mounted ? trainer.name : "";
  const sessionId = usePathname().split("/")[1] ?? "";

  setSession({ id: sessionId });

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

      <Badges
        title
        trainername={trainername}
        red={parseTrainerBadges(trainer.badgesRed ?? "")}
        crystal={parseTrainerBadges(trainer.badgesCrystal ?? "")}
        emerald={parseTrainerBadges(trainer.badgesEmerald ?? "")}
      />
    </main>
  );
}

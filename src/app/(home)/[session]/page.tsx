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
    <div className="grid gap-4">
      <Title />

      <div className="container grid grid-cols-12 items-center gap-4">
        <Badges className="col-span-7" init />

        <JoinTrainer className="col-span-5" sessionId={sessionId} />

        <Badges
          className="col-span-7"
          title
          trainername={trainername}
          red={parseTrainerBadges(trainer.badgesRed ?? "")}
          crystal={parseTrainerBadges(trainer.badgesCrystal ?? "")}
          emerald={parseTrainerBadges(trainer.badgesEmerald ?? "")}
        />
      </div>
    </div>
  );
}

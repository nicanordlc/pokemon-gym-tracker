import { parseTrainerBadges } from "~/utils/parse-trainer-badges";
import { Badges, type BadgesProps } from "~/app/_components/ui/badges";
import { type Trainer } from "@prisma/client";
import { useTrainer } from "~/app/_hooks/trainer";
import { useApp } from "~/app/_hooks/app";
import { getTrainer } from "~/utils/get-trainer";

export function TrainersBadges({
  trainers,
  ...badgesProps
}: BadgesProps & {
  trainers?: Trainer[];
}) {
  const { app } = useApp();
  const { trainers: localTrainers } = useTrainer();

  const localTrainer = getTrainer({
    trainers: localTrainers,
    sessionPath: app.sessionId,
  });

  // console.table(localTrainer);

  return (
    <>
      {localTrainer.id && (
        <Badges
          title
          editable
          trainer={localTrainer}
          red={parseTrainerBadges(localTrainer.badgesRed ?? "")}
          crystal={parseTrainerBadges(localTrainer.badgesCrystal ?? "")}
          emerald={parseTrainerBadges(localTrainer.badgesEmerald ?? "")}
          {...badgesProps}
        />
      )}

      {trainers?.map((trainer, i) => {
        if (localTrainer.id === trainer.id) {
          return null;
        }

        return (
          <Badges
            key={i}
            title
            trainer={trainer}
            red={parseTrainerBadges(trainer.badgesRed ?? "")}
            crystal={parseTrainerBadges(trainer.badgesCrystal ?? "")}
            emerald={parseTrainerBadges(trainer.badgesEmerald ?? "")}
            {...badgesProps}
          />
        );
      })}
    </>
  );
}

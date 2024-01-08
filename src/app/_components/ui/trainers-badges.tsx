import { parseTrainerBadges } from "~/utils/parse-trainer-badges";
import { Badges, type BadgesProps } from "~/app/_components/ui/badges";
import { type Trainer } from "@prisma/client";

export function TrainersBadges({
  localTrainer,
  trainers,
  ...badgesProps
}: BadgesProps & {
  localTrainer?: Trainer;
  trainers?: Trainer[];
}) {
  return (
    <>
      {localTrainer?.id && (
        <Badges
          title
          editable
          trainer={localTrainer}
          red={parseTrainerBadges(localTrainer.badgesRed)}
          crystal={parseTrainerBadges(localTrainer.badgesCrystal)}
          emerald={parseTrainerBadges(localTrainer.badgesEmerald)}
          {...badgesProps}
        />
      )}

      {trainers?.map((trainer, i) => {
        if (localTrainer?.id === trainer.id) {
          return null;
        }

        return (
          <Badges
            key={i}
            title
            trainer={trainer}
            red={parseTrainerBadges(trainer.badgesRed)}
            crystal={parseTrainerBadges(trainer.badgesCrystal)}
            emerald={parseTrainerBadges(trainer.badgesEmerald)}
            {...badgesProps}
          />
        );
      })}
    </>
  );
}

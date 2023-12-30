import { parseTrainerBadges } from "~/utils/parse-trainer-badges";
import { Badges } from "~/app/_components/ui/badges";
import { type Trainer } from "@prisma/client";

export function TrainersBadges(props: {
  localTrainer: Trainer;
  trainers?: Trainer[];
}) {
  return (
    <>
      {props.localTrainer.id && (
        <Badges
          title
          editable
          trainer={props.localTrainer}
          red={parseTrainerBadges(props.localTrainer.badgesRed ?? "")}
          crystal={parseTrainerBadges(props.localTrainer.badgesCrystal ?? "")}
          emerald={parseTrainerBadges(props.localTrainer.badgesEmerald ?? "")}
        />
      )}

      {props.trainers?.map((trainer, i) => {
        if (props.localTrainer.id === trainer.id) {
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
          />
        );
      })}
    </>
  );
}

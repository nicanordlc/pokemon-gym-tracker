import { parseTrainerBadges } from "~/utils/parse-trainer-badges";
import { Badges, type BadgesProps } from "~/app/_components/ui/badges";
import { type Trainer } from "@prisma/client";
import { CONTEXT_MENU_ID_TRAINER } from "./context-menu/trainer";
import { type TriggerEvent, useContextMenu } from "react-contexify";
import clsx from "clsx";

export function TrainersBadges({
  localTrainer,
  trainers,
  ...badgesProps
}: BadgesProps & {
  localTrainer?: Trainer;
  trainers?: Trainer[];
}) {
  const { show } = useContextMenu({ id: CONTEXT_MENU_ID_TRAINER });

  const isLocalLeader = localTrainer?.sessionLeader;

  const displayMenu = (trainer: Trainer) => (event: TriggerEvent) => {
    if (!isLocalLeader) {
      return;
    }

    show({ event, props: trainer });
  };

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
            onContextMenu={displayMenu(trainer)}
            {...badgesProps}
            className={clsx(
              badgesProps.className,
              isLocalLeader
                ? "hover:cursor-context-menu"
                : "hover:cursor-default",
            )}
          />
        );
      })}
    </>
  );
}

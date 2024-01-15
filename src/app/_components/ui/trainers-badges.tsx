import { parseTrainerBadges } from "~/utils/parse-trainer-badges";
import { Badges, type BadgesProps } from "~/app/_components/ui/badges";
import { type Trainer } from "@prisma/client";
import {
  CONTEXT_MENU_TRAINER_ID,
  ContextMenuTrainer,
} from "./context-menu/trainer";
import {
  type TriggerEvent,
  useContextMenu,
  type ItemParams,
} from "react-contexify";
import { api } from "~/trpc/react";

export function TrainersBadges({
  localTrainer,
  trainers,
  ...badgesProps
}: BadgesProps & {
  localTrainer?: Trainer;
  trainers?: Trainer[];
}) {
  const { show } = useContextMenu({ id: CONTEXT_MENU_TRAINER_ID });

  const deleteTrainer = api.trainer.delete.useMutation();

  const isLocalTrainerLeader = localTrainer?.sessionLeader;

  const displayMenu = (trainer: Trainer) => (event: TriggerEvent) => {
    if (!isLocalTrainerLeader) {
      return;
    }

    show({ event, props: trainer });
  };

  const itemHandler = (args: ItemParams) => {
    const trainer = args.props as Trainer;

    switch (args.id) {
      case "delete":
        deleteTrainer.mutate({ id: trainer.id });
        break;
    }
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

      {isLocalTrainerLeader && <ContextMenuTrainer itemHandler={itemHandler} />}
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
          />
        );
      })}
    </>
  );
}

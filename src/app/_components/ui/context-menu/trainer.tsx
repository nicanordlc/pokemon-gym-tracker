import { Item, type ItemParams, Menu, RightSlot } from "react-contexify";
import { type Trainer } from "@prisma/client";
import { api } from "~/trpc/react";

export const CONTEXT_MENU_ID_TRAINER = "context-menu-trainer";

export function ContextMenuTrainer() {
  const deleteTrainer = api.trainer.delete.useMutation();

  const clickHandler = ({ props, id }: ItemParams): void => {
    const trainer = props as Trainer;

    switch (id) {
      case "delete":
        deleteTrainer.mutate({ id: trainer.id });
        break;
    }
  };

  const shortcutDelete = (e: KeyboardEvent) => e.key === "d";

  return (
    <Menu theme="dark" animation="scale" id={CONTEXT_MENU_ID_TRAINER}>
      <Item id="delete" keyMatcher={shortcutDelete} onClick={clickHandler}>
        ❌ Delete <RightSlot>d</RightSlot>
      </Item>
    </Menu>
  );
}

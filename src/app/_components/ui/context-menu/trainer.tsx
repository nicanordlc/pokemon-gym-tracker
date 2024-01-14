import { Item, type ItemParams, Menu, RightSlot } from "react-contexify";

export const CONTEXT_MENU_TRAINER_ID = "context-menu-trainer";

type ContextMenuTrainerProps = {
  itemHandler?: (args: ItemParams) => void;
};

export function ContextMenuTrainer(props: ContextMenuTrainerProps) {
  const deleteShortcut = (e: KeyboardEvent) => e.key === "d";

  return (
    <Menu id={CONTEXT_MENU_TRAINER_ID}>
      <Item id="delete" keyMatcher={deleteShortcut} onClick={props.itemHandler}>
        ❌ Delete <RightSlot>d</RightSlot>
      </Item>
    </Menu>
  );
}

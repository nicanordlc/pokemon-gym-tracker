import { Item, type ItemParams, Menu, RightSlot } from "react-contexify";

export const CONTEXT_MENU_ID_BADGE = "context-menu-badge";

export function ContextMenuBadge() {
  const clickHandler = ({ props }: ItemParams): void => {
    console.log(props);
  };

  const shortcutInfo = (e: KeyboardEvent) => e.key === "i";

  return (
    <Menu theme="dark" animation="scale" id={CONTEXT_MENU_ID_BADGE}>
      <Item id="info" keyMatcher={shortcutInfo} onClick={clickHandler}>
        ℹ️ Info <RightSlot>i</RightSlot>
      </Item>
    </Menu>
  );
}

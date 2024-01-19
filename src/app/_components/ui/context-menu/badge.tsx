import { Item, type ItemParams, Menu, RightSlot } from "react-contexify";
import { useModalContext } from "~/app/_context/modal";

export const CONTEXT_MENU_ID_BADGE = "context-menu-badge";

export function ContextMenuBadge() {
  const { setModalContext } = useModalContext();

  const clickHandler = ({ id }: ItemParams): void => {
    switch (id) {
      case "info":
        setModalContext({ active: true });
        break;
    }
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

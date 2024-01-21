import { Item, type ItemParams, Menu, RightSlot } from "react-contexify";
import { type Badge } from "~/app/_components/badge";
import { ModalContentBadgeInfo } from "~/app/_components/ui/modals/modal-content-badge-info";
import { useModalContext } from "~/app/_hooks/modal";

export const CONTEXT_MENU_ID_BADGE = "context-menu-badge";

export function ContextMenuBadge() {
  const { setModalContext } = useModalContext();

  const getBadgeInfo = (props: Partial<Badge>) => {
    if (!(props.number && props.version)) {
      return null;
    }

    return (
      <ModalContentBadgeInfo number={props.number} version={props.version} />
    );
  };

  const clickHandler = (args: ItemParams<Badge>): void => {
    switch (args.id) {
      case "info":
        setModalContext({
          active: true,
          content: getBadgeInfo({
            number: args.props?.number,
            version: args.props?.version,
          }),
        });
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

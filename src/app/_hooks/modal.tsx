import { useContext } from "react";
import { ModalContext, type ModalContextType } from "~/app/_context/modal";

export function useModalContext() {
  const modalContext = useContext<ModalContextType>(ModalContext);

  if (!modalContext) {
    throw new Error(
      `use${ModalContext.displayName!.replace(
        "Context",
        "",
      )} has to be used within <>`,
    );
  }

  return modalContext;
}

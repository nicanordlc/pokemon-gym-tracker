import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
} from "react";

type ModalContextState = {
  active: boolean;
  content: React.ReactNode | null;
};

export type ModalContextType = {
  modalContext: ModalContextState;
  setModalContext: Dispatch<SetStateAction<ModalContextState>>;
} | null;

const MODAL_CONTEXT_STATE_INIT: ModalContextState = {
  active: false,
  content: null,
};

export const ModalContext = createContext<ModalContextType>(null);
ModalContext.displayName = "ModalContext";

export function ModalProvider(props: {
  children: React.ReactNode;
  value?: ModalContextType;
}) {
  const [modalContext, setModalContext] = useState<ModalContextState>(
    MODAL_CONTEXT_STATE_INIT,
  );

  return (
    <ModalContext.Provider value={{ modalContext, setModalContext }}>
      {props.children}
    </ModalContext.Provider>
  );
}

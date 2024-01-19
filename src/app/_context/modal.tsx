import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ModalContextState = {
  active: boolean;
};

type ModalContextType = {
  modalContext: ModalContextState;
  setModalContext: Dispatch<SetStateAction<ModalContextState>>;
} | null;

const ModalContext = createContext<ModalContextType>(null);
ModalContext.displayName = "ModalContext";

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

export function ModalProvider(props: {
  children: React.ReactNode;
  value?: ModalContextType;
  init?: boolean;
}) {
  const [modalContext, setModalContext] = useState<ModalContextState>({
    active: false,
  });

  return (
    <ModalContext.Provider value={{ modalContext, setModalContext }}>
      {props.children}
    </ModalContext.Provider>
  );
}

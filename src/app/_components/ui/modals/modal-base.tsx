import clsx from "clsx";
import ReactModal from "react-modal";
import { useModalContext } from "~/app/_context/modal";

export function ModalBase() {
  const { setModalContext, modalContext } = useModalContext();

  const handleClose = () => {
    setModalContext({ active: false, content: null });
  };

  return (
    <ReactModal
      ariaHideApp={false}
      className={clsx("absolute inset-3 bg-gray-800 p-5")}
      onRequestClose={handleClose}
      isOpen={modalContext.active}
    >
      {modalContext.content}

      <button className="absolute right-2 top-2" onClick={handleClose}>
        ❌
      </button>
    </ReactModal>
  );
}

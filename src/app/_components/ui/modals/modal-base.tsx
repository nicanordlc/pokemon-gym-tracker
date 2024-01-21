import clsx from "clsx";
import ReactModal from "react-modal";
import { useModalContext } from "~/app/_hooks/modal";

export function ModalBase() {
  const { setModalContext, modalContext } = useModalContext();

  const handleClose = () => {
    setModalContext({ active: false, content: null });
  };

  return (
    <ReactModal
      ariaHideApp={false}
      className={clsx(
        "absolute inset-3 flex items-center justify-center overflow-hidden bg-gray-800 p-5 sm:inset-9 md:inset-12 lg:inset-20 ",
      )}
      onRequestClose={handleClose}
      isOpen={modalContext.active}
    >
      {modalContext.content}

      <button className="absolute right-3 top-2" onClick={handleClose}>
        ❌
      </button>
    </ReactModal>
  );
}

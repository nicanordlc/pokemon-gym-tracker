import clsx from "clsx";
import ReactModal from "react-modal";
import { useModalContext } from "~/app/_context/modal";

export function ModalBadgeInfo() {
  const { setModalContext, modalContext } = useModalContext();

  const handleClose = () => {
    setModalContext({ active: false });
  };

  return (
    <ReactModal
      ariaHideApp={false}
      className={clsx("absolute inset-5 bg-gray-800 p-5")}
      onRequestClose={handleClose}
      isOpen={modalContext.active}
    >
      <button onClick={handleClose}>Close Modal</button>
    </ReactModal>
  );
}

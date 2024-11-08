import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({
  children,
  isOpen,
  onCloseHandler,
  className = "",
}) {
  const dialog = useRef();

  const _open = useEffect(() => {
    /* In case there are multiple modals
      let's lock in the value. 
      */
    const modal = dialog.current;
    if (isOpen) {
      modal.showModal();
    }
    // Clean up function.
    return () => modal.close();
  }, [isOpen]);
  // OnClose = fix keydown event.
  return createPortal(
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      onClose={onCloseHandler}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

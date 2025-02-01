import useOutsideClick from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";

function Modal({ children, setShowModal, className, maskBg = false }) {
  const ref = useOutsideClick(() => setShowModal(""));
  return (
    <>
      {maskBg ? (
        createPortal(
          <>
            <div ref={ref} className={`z-[9999999] h-fit w-fit ${className}`}>
              {children}
            </div>
            <div className="w-screen h-screen z-[999999] fixed top-0 left-0 bg-[#00000007] backdrop-blur-sm"></div>
          </>,
          document.body
        )
      ) : (
        <div ref={ref} className={`z-[99999999] h-fit w-fit ${className}`}>
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;

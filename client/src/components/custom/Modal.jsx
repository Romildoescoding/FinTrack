import useOutsideClick from "@/hooks/useOutsideClick";

function Modal({ children, setShowModal, className }) {
  const ref = useOutsideClick(() => setShowModal(false));
  return (
    <div ref={ref} className={`z-[99999999] h-fit w-fit absolute ${className}`}>
      {children}
    </div>
  );
}

export default Modal;

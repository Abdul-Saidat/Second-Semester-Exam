interface AuthModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function AuthModal({ children, onClose }: AuthModalProps) {
  return (
    <>
      <div className="w-full h-screen z-50 bg-[var(--overlay)] fixed top-0 right-0 flex items-center justify-center">
        <div
          className="bg-white w-[300px] md:w-[450px] rounded-xl shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer absolute top-0 right-5 text-3xl z-10"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default AuthModal;

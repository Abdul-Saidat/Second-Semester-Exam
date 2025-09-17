interface AuthModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function AuthModal({ children, onClose }: AuthModalProps) {
  return (
    <>
      <div
        className="fixed flex flex-col items-center justify-center z-50 bg-black/50 backdrop-blur-2xl"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl w-5xl shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-4 right-4" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default AuthModal;

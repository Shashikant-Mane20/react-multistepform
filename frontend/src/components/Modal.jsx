import { MdOutlineCancel } from "react-icons/md";
import ImageCropper from "./ImageCropper.jsx";

// eslint-disable-next-line react/prop-types
const Modal = ({ updateAvatar, closeModal }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl min-h-[50vh] bg-gray-800 text-slate-100 rounded-2xl shadow-xl transition-all">
          <div className="px-5 py-4">
            <button
              type="button"
              className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
              onClick={closeModal}
            >
              <span className="sr-only">Close menu</span>
              <MdOutlineCancel size={24} />
            </button>
            <ImageCropper updateAvatar={updateAvatar} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

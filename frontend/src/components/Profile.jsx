import { useRef, useState, useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import Modal from "./Modal";

const Profile = ({ updateAvatar }) => {
  const avatarUrl = useRef(
    localStorage.getItem("avatar") || "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false); // State to track image preview modal
  const [avatar, setAvatar] = useState(avatarUrl.current);

  const handleUpdateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    setAvatar(imgSrc);
    localStorage.setItem("avatar", imgSrc);
    if (updateAvatar) updateAvatar(imgSrc); // Call parent updateAvatar if passed
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatar}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400 cursor-pointer"
          onClick={() => setPreviewOpen(true)} // Open preview modal
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <BiPencil />
        </button>
      </div>
      <h2 className="text-white font-bold mt-6">Shashikant Mane</h2>
      <p className="text-gray-500 text-xs mt-2">FullStack Developer</p>

      {/* Profile Picture Upload Modal */}
      {modalOpen && (
        <Modal
          updateAvatar={handleUpdateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {/* Image Preview Modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setPreviewOpen(false)} // Close preview on click outside
        >
          <img
            src={avatar}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;

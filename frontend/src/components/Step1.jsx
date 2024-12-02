import Profile from "./Profile";

const Step1 = ({ formData, setFormData }) => {
  const updateAvatar = (imgSrc) => {
    setFormData({ ...formData, avatar: imgSrc });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 1: Upload Profile Picture</h2>
      <Profile updateAvatar={updateAvatar} />
    </div>
  );
};

export default Step1;

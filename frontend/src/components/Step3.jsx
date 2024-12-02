const Step3 = ({ formData, setFormData }) => {
    const handleFileChange = (e) => {
      setFormData({ ...formData, file: e.target.files[0] });
    };
  
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Step 3: Upload File</h2>
        <input
          type="file"
          accept=".pdf, image/*"
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onChange={handleFileChange}
        />
      </div>
    );
  };
  
  export default Step3;
  
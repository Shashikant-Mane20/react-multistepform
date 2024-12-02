const Step2 = ({ formData, setFormData }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Step 2: Enter Details</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter Name"
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            placeholder="Enter Designation"
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };
  
  export default Step2;
  
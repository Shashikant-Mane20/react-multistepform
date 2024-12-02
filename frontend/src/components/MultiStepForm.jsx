// import { useState } from "react";
// import Swal from "sweetalert2";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";

// const MultiStepForm = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     avatar: "",
//     name: "",
//     designation: "",
//     file: null,
//   });

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handleBack = () => setStep((prev) => prev - 1);

//   const saveToDatabase = async () => {
//     const formDataToSend = new FormData();
//     if (formData.avatar) {
//       formDataToSend.append("avatar", formData.avatar); // Add avatar if it's present
//     }
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("designation", formData.designation);
//     formDataToSend.append("file", formData.file);
  
//     try {
//       const response = await fetch("http://localhost:5000/submit", {
//         method: "POST",
//         body: formDataToSend,
//       });
//       console.log(response);
  
//       if (response.ok) {
//         localStorage.setItem("formData", JSON.stringify(formData));
//         Swal.fire("Success!", "Your data has been saved!", "success");
//       } else {
//         throw new Error("Failed to save data.");
//       }
//     } catch (error) {
//       Swal.fire("Error", error.message, "error");
//     }
//   };
  

//   return (
//     <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-6 shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-6 text-white">
//         Multi-Step Form
//       </h1>
//       {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
//       {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
//       {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
//       <div className="flex justify-between mt-6">
//         {step > 1 && (
//           <button
//             className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
//             onClick={handleBack}
//           >
//             Back
//           </button>
//         )}
//         {step < 3 ? (
//           <button
//             className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             onClick={saveToDatabase}
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;

import { useState } from "react";
import Swal from "sweetalert2";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    designation: "",
    file: null,
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const saveToDatabase = async () => {
    const formDataToSend = new FormData();
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar); // Add avatar if it's present
    }
    formDataToSend.append("name", formData.name);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("file", formData.file);

    // Display loading bar toast
    Swal.fire({
      title: "Submitting...",
      html: `<div class="h-1 bg-blue-500 rounded-full w-full animate-pulse"></div>`,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        localStorage.setItem("formData", JSON.stringify(formData));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your data has been saved!",
          showConfirmButton: true,
        });
        setStep(1); // Reset form to Step 1
        setFormData({ avatar: "", name: "", designation: "", file: null }); // Clear form data
      } else {
        throw new Error("Failed to save data.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-6 shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Multi-Step Form
      </h1>
      {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={saveToDatabase}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

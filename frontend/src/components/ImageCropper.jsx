import { useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../setCanvasPreview"; 

const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [cropMode, setCropMode] = useState("circle"); // Modes: 'circle', 'square', 'custom'

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result.toString());
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    const initialCrop = makeAspectCrop(
      { unit: "%", width: 50 }, // Start with 50% width
      cropMode === "circle" || cropMode === "square" ? 1 : undefined, // Aspect ratio for fixed shapes
      width,
      height
    );

    const centeredCrop = centerCrop(initialCrop, width, height);
    setCrop(centeredCrop);
  };

  const updateCanvasPreview = () => {
    const canvas = previewCanvasRef.current;
    const image = imgRef.current;

    if (!canvas || !completedCrop || !image) return;

    const pixelCrop = convertToPixelCrop(completedCrop, image.width, image.height);

    setCanvasPreview(image, canvas, pixelCrop);
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-6 lg:p-8">
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose Profile Photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2
          file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300
          hover:file:bg-gray-600"
        />
      </label>
      {imgSrc && (
        <div className="flex flex-col items-center w-full max-w-sm">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            circularCrop={cropMode === "circle"}
            aspect={cropMode === "custom" ? undefined : cropMode === "circle" ? 1 : 1}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              className="max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh]"
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <div className="flex space-x-4 mt-4">
            <button
              className="text-white font-mono text-xs py-2 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600"
              onClick={() => setCropMode("circle")}
            >
              Circular Crop
            </button>
            <button
              className="text-white font-mono text-xs py-2 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600"
              onClick={() => setCropMode("square")}
            >
              Square Crop
            </button>
            <button
              className="text-white font-mono text-xs py-2 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600"
              onClick={() => setCropMode("custom")}
            >
              Custom Crop
            </button>
          </div>

          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              updateCanvasPreview();
              const dataUrl = previewCanvasRef.current?.toDataURL();
              if (dataUrl) {
                updateAvatar(dataUrl);
                closeModal();
              }
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      <canvas
        ref={previewCanvasRef}
        className="hidden"
        style={{
          border: "1px solid black",
          objectFit: "contain",
          width: "150px",
          height: "150px",
        }}
      />
    </div>
  );
};

export default ImageCropper;

import React, { useState } from 'react';

const ImageUpload = ({ className }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative w-32 h-32">
        <input
          type="file"
          id="imageUpload"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
        <label
          htmlFor="imageUpload"
          className="w-full h-full flex justify-center items-center rounded-full border-2 border-gray-300 bg-gray-100 overflow-hidden"
        >
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-gray-500">Upload Image</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;

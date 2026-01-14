import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({
  image,
  setImage,
  size = "md", // sm | md | lg
}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Size map
  const sizeClasses = {
    sm: {
      wrapper: "w-20 h-20",
      icon: "text-4xl",
      button: "w-8 h-8",
    },
    md: {
      wrapper: "w-28 h-28",
      icon: "text-5xl",
      button: "w-9 h-9",
    },
    lg: {
      wrapper: "w-36 h-36",
      icon: "text-6xl",
      button: "w-10 h-10",
    },
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const currentSize = sizeClasses[size];

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className={`${currentSize.wrapper} flex items-center justify-center bg-purple-100 rounded-full relative`}
        >
          <LuUser className={`${currentSize.icon} text-primary`} />

          <button
            type="button"
            className={`${currentSize.button} flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1`}
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className={`${currentSize.wrapper} rounded-full object-cover`}
          />

          <button
            type="button"
            className={`${currentSize.button} flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1`}
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;

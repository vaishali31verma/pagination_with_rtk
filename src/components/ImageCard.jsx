import React from "react";

const ImageCard = ({ id, imageUrl, name }) => {
  return (
    <div
      key={id}
      className="border border-gray-300 rounded-lg overflow-hidden flex flex-col items-center justify-center"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-auto object-contain"
        style={{ maxHeight: "200px" }}
      />
      <div className="p-2 text-center">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm">ID: {id}</p>
      </div>
    </div>
  );
};

export default ImageCard;

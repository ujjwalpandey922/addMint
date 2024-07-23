"use client";
import { NFT } from "@thirdweb-dev/sdk";
import Image from "next/image";
import React from "react";
interface ModalProps {
  nftData: NFT;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ nftData, onClose }) => {
  console.log({ nftData });
  const OuterRef = React.useRef<HTMLDivElement>(null);
  const InnerRef = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === OuterRef.current) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleClickOutside}
      ref={OuterRef}
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50 px-4"
    >
      <div
        className="relative bg-white rounded-xl w-full max-w-3xl"
        ref={InnerRef}
      >
        <div className="flex justify-center w-full max-w-3xl relative rounded-t-xl">
          <Image
            src={nftData?.metadata?.image as string}
            alt="NFT Image"
            className="rounded-t-xl w-full h-auto "
            width={100}
            height={100}
          />
        </div>
        <div className="p-4">
          <h2 className="text-3xl text-center font-bold mb-1 line-clamp-2">
            {nftData?.metadata?.name}
          </h2>
          <p className="text-lg text-center text-gray-500 mb-4 truncate">
            {nftData.metadata?.description}
          </p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 ">
              <strong className="mr-2 col-span-1">Owner:</strong>
              <span className="truncate col-span-2">{nftData.owner}</span>
            </div>
            <div className="grid grid-cols-3 ">
              <strong className="mr-2 col-span-1">Supply:</strong>
              <span className="truncate col-span-2">{nftData.supply}</span>
            </div>
            <div className="grid grid-cols-3 ">
              <strong className="mr-2 col-span-1">Type:</strong>
              <span className="truncate col-span-2">{nftData.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

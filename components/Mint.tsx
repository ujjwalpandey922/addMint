"use client";
import MapboxSearchMap from "../components/AddressInput";
import Map from "../components/Map";
import html2canvas from "html2canvas";
import { mintAddressNFT } from "@/utils/mintNFT";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface SelectedPlace {
  lng: number;
  lat: number;
  place_name: string;
}
const Mint = () => {
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );
  const [uploading, setUploading] = useState(false);

  const handleAddressSelect = (place: any) => {
    setSelectedPlace({
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
      place_name: place.place_name,
    });
  };

  const handleGenerateNFT = async () => {
    if (!selectedPlace) return;
    setUploading(true);
    const input = document.getElementById("mapSS") as HTMLInputElement;
    const canvas = await html2canvas(input, {
      logging: true,
      useCORS: true,
    });
    const imageBase64 = canvas.toDataURL("image/png");
    try {
      const name = `NFT for ${selectedPlace.place_name}`;
      const description = "An NFT generated from an address.";
      const res = await mintAddressNFT(imageBase64, name, description);
      if (res) {
        toast.success("Congratulations, Your NFT is MINTED !!!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.success("Sorry, Something went wrong. Try Again !!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setUploading(false);
      setSelectedPlace(null);
    }
  };
  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">
        Generate an NFT for Your Address
      </h1>
      <MapboxSearchMap onSelect={handleAddressSelect} />
      {selectedPlace && (
        <>
          <Map center={{ lng: selectedPlace.lng, lat: selectedPlace.lat }} />
          <button
            onClick={handleGenerateNFT}
            className={`bg-blue-500 ${
              uploading ? "cursor-none" : ""
            } group/modal-btn text-white p-2 mt-4 rounded flex justify-center relative overflow-hidden `}
            disabled={uploading}
          >
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              {uploading ? "Generating..." : "Generate NFT"}
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              👛
            </div>
          </button>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Mint;

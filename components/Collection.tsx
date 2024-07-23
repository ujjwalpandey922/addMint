"use client";
import { getAllNFTs } from "@/utils/mintNFT";
import { NFT } from "@thirdweb-dev/sdk";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Modal from "./Modal";
import Loader from "./ui/Loader";
const Collection = () => {
  const [collections, setCollections] = useState<NFT[] | undefined>();
  const [selectedCollection, setSelectedCollection] = useState<
    NFT | undefined
  >();
  useEffect(() => {
    const fetchCollection = async () => {
      const collections = await getAllNFTs();
      setCollections(collections);
    };
    fetchCollection();
  }, []);
  if (!collections) return <Loader />;
  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">Your NFT Collections...!!!</h1>
      <div className="flex flex-wrap justify-center items-center gap-12">
        {collections
          ?.filter(
            (collection) =>
              collection.owner !== "0x0000000000000000000000000000000000000000"
          )
          .map((collection) => (
            <CardContainer
              onClick={() => setSelectedCollection(collection)}
              className="inter-var cursor-pointer w-full max-w-[400px]"
              key={collection?.metadata?.uri}
            >
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white max-w-sm "
                >
                  {collection?.metadata?.description}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 truncate text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {collection?.metadata?.name}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={collection?.metadata?.image as string}
                    height="100"
                    width="100"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        {selectedCollection && (
          <Modal
            nftData={selectedCollection}
            onClose={() => setSelectedCollection(undefined)}
          />
        )}
      </div>
    </>
  );
};

export default Collection;

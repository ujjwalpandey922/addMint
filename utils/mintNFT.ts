import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// Initialize provider and wallet
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`
);

const wallet = new ethers.Wallet(
  process.env.NEXT_PUBLIC_PRIVATE_KEY!,
  provider
);

// Initialize SDK from a Third Party Wallet
const sdk = ThirdwebSDK.fromSigner(wallet, "sepolia", {
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
});

// Function to get the contract instance
const getContractInstance = async () => {
  return await sdk.getContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  );
};

// Function to mint an NFT
export const mintAddressNFT = async (
  image: string,
  name: string,
  description: string
) => {
  const NFTContract = await getContractInstance();
  const nftMetadata = {
    name,
    description,
    image, // assuming 'image' is a file path; use a URL if it's a URL
  };

  try {
    // Mint the NFT
    const tx = await NFTContract.erc721.mint(nftMetadata);
    return tx;
  } catch (error) {
    console.error("Minting error:", error);
  }
};

// Function to get all NFTs
export const getAllNFTs = async () => {
  const NFTContract = await getContractInstance();
  try {
    // Fetch all NFTs
    const allNFTs = await NFTContract.erc721.getAll();
    return allNFTs;
  } catch (error) {
    console.error("Fetching error:", error);
  }
};

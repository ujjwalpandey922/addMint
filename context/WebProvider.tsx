"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import React from "react";

const WebProvider = ({ children }: { children: React.ReactNode }) => {
  // This is the chainId your dApp will work on.
  const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

  return (
    <ThirdwebProvider clientId={clientId} activeChain={"sepolia"}>
      {children}
    </ThirdwebProvider>
  );
};

export default WebProvider;

"use client";

import { createContext, useContext, useState } from "react";

// Create Context
const GlobalStateContext = createContext();

// Create the provider component
export const GlobalStateProvider = ({ children }) => {
  const [qrData, setQrData] = useState("");
  // const [address, setAddress] = useState("");
  // const [qrCode, setQrCode] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{
        qrData,
        setQrData,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

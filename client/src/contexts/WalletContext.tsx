import { ethers } from "ethers";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";
import { shortenAddress } from "../utils/shortenAddress";

type Wave = {
  message: string;
  sender: string;
  timestamp: Date;
  result: boolean;
};

type WalletContextType = {
  connectWallet: () => Promise<void>;
  wave: (message: string) => Promise<void>;
  currentAccount: string;

  transactionLoading: boolean;
  waves: Wave[];
};

export const WalletContext = createContext<WalletContextType>({} as WalletContextType);

const getEthereum = () => {
  const ethereum = window.ethereum;

  if (!ethereum) {
    alert("Please install MetaMask to use this app");
    return;
  }

  return ethereum;
};

const getContract = () => {
  try {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

    return { provider, signer, wavePortalContract };
  } catch (error) {
    console.log("error when getting the contract", error);
  }
};

const WalletProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [waves, setWaves] = useState<Wave[]>([]);

  const getWaves = useCallback(async () => {
    const contract = getContract();
    if (!contract) return;

    try {
      const { wavePortalContract } = contract;
      const rawWaves = await wavePortalContract.getWaves();
      console.log({ rawWaves });
      const waves = rawWaves
        .map((wave: any) => ({
          message: wave.message,
          sender: shortenAddress(wave.sender),
          timestamp: new Date(wave.timestamp.toNumber() * 1000),
          result: wave.result,
        }))
        .reverse();

      console.log("waves: ", waves);
      setWaves(waves);
    } catch (error) {
      console.log("Error when getting waves: ", error);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    try {
      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(`connected: ${account}`);
      setCurrentAccount(account);
      getWaves();
    } catch (error) {
      console.log(error);
    }
  }, [getWaves]);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const ethereum = getEthereum();
      if (!ethereum) return;

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        const account = accounts[0];
        console.log(`Found an authorized account: ${account}`);
        setCurrentAccount(account);
        getWaves();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }, [getWaves]);

  const wave = useCallback(
    async (message: string) => {
      if (transactionLoading) return;

      const contractData = getContract();
      if (!contractData) return;

      try {
        const { wavePortalContract, provider } = contractData;
        let count = await wavePortalContract.getTotalWaves();

        wavePortalContract.on("NewWave", (sender: string, message: string, timestamp: any, result: boolean) => {
          if (!result) {
            window.location.href = "https://youtu.be/dQw4w9WgXcQ";
          }
        });

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        setTransactionLoading(true);
        console.log("Mining... ", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        await getWaves();

        count = await wavePortalContract.getTotalWaves();
        console.log(count.toNumber());
      } catch (error) {
        console.log("error when waving: ", error);
      } finally {
        setTransactionLoading(false);
      }
    },
    [transactionLoading, getWaves]
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <WalletContext.Provider value={{ connectWallet, currentAccount, wave, transactionLoading, waves }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;

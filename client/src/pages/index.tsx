/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useCallback, useContext, useRef } from "react";
import Spinner from "../components/Spinner";
import { WalletContext } from "../contexts/WalletContext";

const Home: NextPage = () => {
  const { connectWallet, currentAccount, wave, transactionLoading, waves } = useContext(WalletContext);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const formatDate = useCallback((date: Date) => {
    const twoDigitsNumber = (number: number) => (number < 10 ? `0${number}` : number);

    return `${twoDigitsNumber(date.getHours())}:${twoDigitsNumber(date.getMinutes())} - ${twoDigitsNumber(
      date.getMonth() + 1
    )}/${twoDigitsNumber(date.getDate())}/${date.getFullYear()}`;
  }, []);

  const handleWave = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      wave(messageInputRef.current?.value || "");
    },
    [wave, messageInputRef]
  );

  return (
    <div className="bg-stone-100 flex flex-col items-center">
      <Head>
        <title>Rick Roll Roulette</title>
        <meta property="og:title" content="Rick Roll Roulette" />
        <meta property="og:site_name" content="Rick Roll Roulette" />
        <meta property="og:url" content="https://web3-rick-roll-roulette.vercel.app/" />
        <meta
          property="og:description"
          content="Take a chane! Or you 'll win Ether (test network) or 'll be rick rolled!"
        />
        <meta property="og:description" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://web3-rick-roll-roulette.vercel.app/ogimage.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Take a chane! Or you 'll win Ether (test network) or 'll be rick rolled!"
        />
        <meta name="twitter:title" content="Rick Roll Roulette" />
        <meta name="twitter:image" content="https://web3-rick-roll-roulette.vercel.app/ogimage.jgp" />

        <meta name="description" content="Take a chane! Or you 'll win Ether (test network) or 'll be rick rolled!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col text-center items-center justify-center min-h-screen">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">Take your chance 🎲</h1>
        <p className="text-md sm:text-xl font-semibold  w-10/12 mb-12">
          Take a chance! With a little of gas fee and luck you can win Ether (test network) or be rick rolled. Connect
          your wallet and test your luck!
        </p>

        {currentAccount ? (
          <>
            <form onSubmit={handleWave} className="flex flex-col sm:flex-row ">
              <input
                type="text"
                ref={messageInputRef}
                placeholder="Send a message"
                className="rounded w-full sm:w-80 text-xl mb-2 sm:mb-0 mr-3 px-2 py-2 bg-transparent border-stone-200 border-2"
              />
              <button
                type="submit"
                disabled={transactionLoading}
                className="bg-blue-600 text-white py-1 sm:py-0 font-semibold text-xl px-6 hover:bg-blue-700 rounded"
              >
                {transactionLoading ? <Spinner /> : "Test your luck!"}
              </button>
            </form>

            <p className="text-xs sm:text-sm text-gray-500 relative mb-12 top-4">Address Connected: {currentAccount}</p>
          </>
        ) : (
          <button
            className="bg-purple-600 text-white font-bold text-xl px-8 py-1 rounded hover:bg-purple-700"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}

        <div className="waves flex flex-col items-center mx-auto scrollbar scrollbar-thin pr-3 scrollbar-thumb-blue-300   w-10/12 sm:w9/12 md:w-6/12 max-h-[50vh] overflow-y-auto	">
          {waves.map((wave, index) => (
            <div key={index} className="flex w-full flex-col p-3 my-1 sm:my-2 bg-blue-200">
              <div className="flex ">
                <img
                  className="w-10 h-10  sm:w-16 sm:h-16 object-cover mr-4"
                  alt="Image"
                  src={`/images/${wave.result ? "ether-icon.png" : "rickroll.gif"}`}
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 justify-between mb-3">
                    <p className="font-bold text-xs sm:text-sm">{wave.sender}</p>
                    <p className="font-bold text-xs sm:text-sm ">{formatDate(wave.timestamp)}</p>
                  </div>

                  <p className="text-left">{wave.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="md:absolute md:bottom-2">
        <p className="text-sm text-gray-400 ">developed by brunoeduardodev</p>
      </footer>
    </div>
  );
};

export default Home;

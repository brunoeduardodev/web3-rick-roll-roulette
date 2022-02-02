import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-white flex flex-col items-center">
      <Head>
        <title>Rick Roll Roulette</title>
        <meta
          name="description"
          content="Take a chane! Or you 'll win Ether (test network) or 'll be rick rolled!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col text-center items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Take your chance 🎲</h1>
        <p className="text-xl font-semibold  w-10/12 mb-12">
          Take a chance! With a little of gas fee and luck you can win Ether
          (test network) or be rick rolled
        </p>

        <button className="bg-blue-600 text-white font-bold text-2xl px-6 py-1 hover:bg-blue-700 rounded">
          GOOD LUCK
        </button>
      </main>

      <footer className="absolute bottom-2">
        <p className="text-sm text-gray-400 ">developed by brunoeduardodev</p>
      </footer>
    </div>
  );
};

export default Home;

# Rick Roll Roulette

Take a chance! With a little of gas fee and luck you can win Ether (test network) or be rick rolled. Connect your wallet and test your luck!

Web3 project to study events, wavePortals inside contracts and randomness.
The project runs on Ropsten testing network.

![Project Picture](https://user-images.githubusercontent.com/50559336/152540191-3c164f9c-a5c9-4016-8951-2d950dcd3175.jpg)

# Maybe you're wondering:

> Wait! can i win Ether?

Yes, but on Ropsten testing network only, its not real money lol.

> Wait, but smart contracts are not good for randomness

Yeah, i know, but its a small project just for fun, i don't think the miners will try to manipulate this small project in a test network.

# How to run

Before run, see the project is separed on two folders: `client` and `smart_contract`, at first, lest start configurating the `smart_contract` part.

## Smart Contract

Create a .env file and follow the .env.example with your data.

To run the smart contract locally you can run `npx hardhat run scripts/run.ts`. You can also run `npx hardhat test` to ensure everything is okay.

### Deploying to blockchain

To deploy the smart contract to blockchain you can run `npx hardhat run scripts/deploy.ts --network ropsten`.

Make sure to copy the portal address of your newly deployed contract!

After that we're done about the SmartContract configuration.

## Client

The client is a standard NextJS project, before running, you need to update the SmartContract connection configuration.

In order to do that, go to `src/utils/constants` and replace the contractAddress with the address you copied on the previous step.

Now, you need to update the contract ABI, a file where all your contract info and how to interact with it is stored.

To do that, go to `smart_contract/artifacts/WavePortal.sol/` and copy WavePortals.json and replace the `WavePortal.json` file located on `src/utils/`.

After that you're done! Just need run `npm run dev` or `yarn dev`.

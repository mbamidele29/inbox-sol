const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "cabin fury quote gorilla orphan foster crowd auto filter review fringe prison",
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/c725d061efdb4189be05bace6d1c8d83",
});

// const provider = new HDWalletProvider(
//   "cabin fury quote gorilla orphan foster crowd auto filter review fringe prison",
//   "https://rinkeby.infura.io/v3/c725d061efdb4189be05bace6d1c8d83"
// );

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`attempting to deploy from ${accounts[0]}`);

  try {
    const inbox = await new web3.eth.Contract(interface)
      .deploy({ data: bytecode, arguments: ["Hi there"] })
      .send({ from: accounts[0], gas: "1000000" });

    console.log(`contract deployed to ${inbox.options.address}`);
    provider.engine.stop();
  } catch (err) {
    console.log(err);
  }
};

deploy();

const fs = require("fs");
const path = require("path");
const solc = require("solc");

const filePath = path.resolve(__dirname, "contracts", "inbox.sol");

const source = fs.readFileSync(filePath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
  interface: output.contracts["inbox.sol"]["Inbox"].abi,
  bytecode: output.contracts["inbox.sol"]["Inbox"].evm.bytecode.object,
};

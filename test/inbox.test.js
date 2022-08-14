const Web3 = require("web3");
const assert = require("assert");
const ganache = require("ganache");

const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let inbox;
let accounts;
const defaultMessage = "Hello from me to you ";
beforeEach(async () => {
  // Get a list of accounts
  accounts = await web3.eth.getAccounts();
  // deploy contract with one of the accounts
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: [defaultMessage],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox.sol", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.getMessage().call();

    assert.ok(message);
    assert.equal(message, defaultMessage);
  });

  it("updates the message", async () => {
    console.log(inbox);
    const newMessage = "This is an updated message";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });

    const message = await inbox.methods.message().call();

    assert.equal(message, newMessage);
  });
});

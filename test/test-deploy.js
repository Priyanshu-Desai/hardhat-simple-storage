const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorage, simpleStorageFactory;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.waitForDeployment();
  });
  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), "0");
  });
  it("Should update when we call store", async function () {
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    assert.equal(updatedValue.toString(), "7");
  });
  it("Should add a person and retrieve their favorite number", async function () {
    const transactionResponse = await simpleStorage.addPeople("Priyanshu", 10);
    await transactionResponse.wait(1);
    const person = await simpleStorage.people(0);
    assert.equal(person.Name, "Priyanshu");
    assert.equal(person.FavouriteNumber.toString(), "10");
  });
});

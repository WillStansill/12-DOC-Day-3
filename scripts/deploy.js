const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the contract without providing any constructor arguments
  const AddIntegers = await hre.ethers.deployContract("AddIntegers");

  // Wait for the contract to deploy
  await AddIntegers.waitForDeployment();

  // Print the address of the deployed contract
  console.log("AddIntegers Contract Address:", AddIntegers.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: AddIntegers.target,
  });
}

// Call the main function and catch any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

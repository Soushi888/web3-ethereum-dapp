// @ts-ignore
const main = async () => {
	const {ethers} = require("hardhat");
	const [deployer] = await ethers.getSigners();
	const accountBalance = await deployer.getBalance();

	console.log("Deploying contracts with account: ", deployer.address);
	console.log("Account balance: ", accountBalance.toString());

	const waveContractFactory = await ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();

	console.log("WavePortal address: ", waveContract.address);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

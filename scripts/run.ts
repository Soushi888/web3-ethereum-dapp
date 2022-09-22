const main = async () => {
	const {ethers} = require("hardhat");
	const [owner, randomPerson] = await ethers.getSigners();
	const waveContractFactory = await ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();

	console.log("Contract deployed to:", waveContract.address);
	console.log("Contract deployed by:", owner.address);

	let waveCount;
	waveCount = await waveContract.getTotalWaves();

	let waveTxn = await waveContract.wave();
	await waveTxn.wait();

	waveTxn = await waveContract.connect(randomPerson).wave();
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();
}

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

runMain();
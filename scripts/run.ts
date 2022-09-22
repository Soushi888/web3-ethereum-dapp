// @ts-ignore
const main = async () => {
	const {ethers} = require("hardhat");
	const [owner, randomPerson] = await ethers.getSigners();
	const waveContractFactory = await ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();

	console.log("Contract deployed to:", waveContract.address);
	console.log("Contract deployed by:", owner.address);

	await waveContract.getTotalWaves();

	let waveTxn = await waveContract.wave();
	await waveTxn.wait();

	waveTxn = await waveContract.connect(randomPerson).wave();
	await waveTxn.wait();

	await waveContract.getTotalWaves();

	waveTxn = await waveContract.resetWaves();
	await waveTxn.wait();

	await waveContract.getTotalWaves();

	waveTxn = await waveContract.waveLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
	await waveTxn.wait();

	let waves = await waveContract.getWaves();
	console.log(waves);

	let linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
	await linkTxn.wait();

	linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=lQEZkfGsRx8");

	let links = await waveContract.getLinks();
	console.log(links);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
import {expect} from "chai";

describe('WavePortal', () => {
	const {ethers} = require('hardhat');

	async function setup() {
		const waveContractFactory = await ethers.getContractFactory("WavePortal");
		const waveContract = await waveContractFactory.deploy();
		const [owner, randomPerson] = await ethers.getSigners();

		await waveContract.deployed();
		return {waveContract, owner, randomPerson};
	}

	it('should total waves be 0', async () => {
		const {waveContract} = await setup();
		let wavesNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(wavesNumber).to.equal(0);
	});

	it('should total waves be 1', async () => {
		const {waveContract} = await setup();
		let waveTxn = await waveContract.wave();
		await waveTxn.wait();

		let waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(1);
	});

	it('should total waves be 2', async () => {
		const {waveContract} = await setup();
		let waveTxn = await waveContract.wave();
		await waveTxn.wait();

		waveTxn = await waveContract.wave();
		await waveTxn.wait();

		let waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(2);
	});

	it('should random peer wave', async () => {
		const {waveContract, randomPerson, owner} = await setup();

		let randomPeerTxn = await waveContract.connect(randomPerson).wave();
		await randomPeerTxn.wait();

		let ownerTxn = await waveContract.wave();
		await ownerTxn.wait();

		let waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(2);
		expect(randomPeerTxn.from).not.to.equal(ownerTxn.from);
	});

	it('should wave a link', async () => {
		const {waveContract} = await setup();

		let waveTxn = await waveContract.waveLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		// let waveTxn = await waveContract.wave();
		await waveTxn.wait();

		let waves = await waveContract.getWaves();
		console.log(waves);

		let waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(1);
	});
});
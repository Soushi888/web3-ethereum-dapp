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

	it('should reset waves', async () => {
		const {waveContract} = await setup();

		let waveTxn = await waveContract.wave();
		await waveTxn.wait();

		let waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(1);

		let resetTxn = await waveContract.resetWaves();
		await resetTxn.wait();

		waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(0);
	});

	it('should not wave if link not previously added', async () => {
		const {waveContract} = await setup();

		let waveTxn = await waveContract.waveLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await waveTxn.wait();

		let waves = await waveContract.getWaves();
		console.log(waves);

		let waveNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(waveNumber).to.equal(0);
	});

	it('should add a link', async () => {
		const {waveContract} = await setup();

		let linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await linkTxn.wait();

		let links = await waveContract.getLinks();
		console.log(links);

		expect(links.length).to.equal(1);
	});

	it('should not add link if already present', async () => {
		const {waveContract} = await setup();

		let linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await linkTxn.wait();

		linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await linkTxn.wait();

		let links = await waveContract.getLinks();
		expect(links.length).to.equal(1);
	});

	it('should get a link', async () => {
		const {waveContract} = await setup();

		let linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await linkTxn.wait();

		linkTxn = await waveContract.addLink("https://buildspace.so/");
		await linkTxn.wait();

		linkTxn = await waveContract.addLink("https://journalducoin.com/");
		await linkTxn.wait();


		let link = await waveContract.getLink('https://buildspace.so/');
		console.log(link);

		expect(link.link).to.equal("https://buildspace.so/");
	});

	it('should wave a link', async () => {
		const {waveContract} = await setup();

		let linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await linkTxn.wait();

		let waveTxn = await waveContract.waveLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await waveTxn.wait();

		let wavesNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(wavesNumber).to.equal(1);

		let link = await waveContract.getLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		expect(link.waveCount).to.equal(1);
	});

	it('should wave a link twice', async () => {
		const {waveContract} = await setup();

		let linkTxn = await waveContract.addLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await linkTxn.wait();

		let waveTxn = await waveContract.waveLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await waveTxn.wait();

		waveTxn = await waveContract.waveLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		await waveTxn.wait();


		linkTxn = await waveContract.addLink("https://www.buildspace.so/");
		await linkTxn.wait();

		waveTxn = await waveContract.waveLink("https://www.buildspace.so/");
		await waveTxn.wait();

		let wavesNumber = (await waveContract.getTotalWaves()).toNumber();
		expect(wavesNumber).to.equal(3);

		let link = await waveContract.getLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		expect(link.waveCount).to.equal(2);
	});
});
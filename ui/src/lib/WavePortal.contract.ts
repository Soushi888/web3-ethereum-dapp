import {ethers} from "ethers";
// @ts-ignore
import abi from "../utils/WavePortal.json";
// @ts-ignore
import versions from "../utils/versions.json";
import type {WavePortal} from "../../../typechain-types";

async function WavePortalContract(): Promise<WavePortal> {
	// @ts-ignore
	const {ethereum} = window;
	const contractAddress = versions.latest;
	const contractABI = abi.abi;

	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer) as WavePortal;

	return wavePortalContract;
}

export default WavePortalContract;
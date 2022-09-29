/// <reference types="svelte" />
import {BigNumber, Contract} from "ethers";

type WavePortalContract = Contract & {
	wave: () => Promise<void>;
	getTotalWaves: () => Promise<BigNumber>;
}
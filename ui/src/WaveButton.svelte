<script lang="ts">
  import {ethers} from "ethers";
  import abi from "./utils/WavePortal.json";
  import type {WavePortalContract} from "./global";

  export let account;
  const {ethereum} = window;
  const contractAddress = "0x36288dC723cCb075d6F743eCD3aAca6368087e42";
  const contractABI = abi.abi;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer) as WavePortalContract;

  const wave = async () => {
    try {
      await wavePortalContract.wave();
      console.log("Waved!");
    } catch (error) {
      console.error(error);
    }
  }

  const getWaves = async () => {
    try {
      const waves = await wavePortalContract.getTotalWaves();
      console.log("Total waves :", waves.toNumber());
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="buttons">
  <button class="wave-btn" on:click={wave}>Wave at Me</button>
  <button class="wave-btn" on:click={getWaves}>Get Count</button>
</div>

<style>
  .wave-btn {
    cursor: pointer;
    margin-top: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
  }
</style>
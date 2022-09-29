<script lang="ts">
  import {ethers} from "ethers";
  import abi from "./utils/WavePortal.json";
  import versions from "./utils/versions.json";
  import type {WavePortal} from "../../typechain-types/WavePortal";


  let isLoading = false;

  const {ethereum} = window;
  const contractAddress = versions.v2;
  const contractABI = abi.abi;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer) as WavePortal;

  const wave = async () => {
    try {
      let waveTxn = await wavePortalContract.wave();
      isLoading = true;
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      isLoading = false;
      alert("Waved!");
    } catch (error) {
      console.error(error);
    }
  }

  const getWaves = async () => {
    try {
      const waves = await wavePortalContract.getTotalWaves();
      alert(`Total waves: ${waves}`);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="buttons">
  {#if (isLoading)}
    <button class="wave-btn" disabled>Waving...</button>
  {:else}
    <button class="wave-btn" on:click={wave}>Wave at Me</button>
  {/if}
  <button class="wave-btn" on:click={getWaves}>Get Count</button>
</div>

<style>
  .wave-btn {
    cursor: pointer;
    margin-top: 16px;
    padding: 10px 20px;
    border: 1px solid #000;
    border-radius: 5px;
  }

  .wave-btn:disabled {
    cursor: not-allowed;
  }
</style>
<script lang="ts">
  import WavePortalContract from "./lib/WavePortal.contract";
  import {onMount} from "svelte";

  let contract;
  let isLoading = false;

  onMount(async () => {
    contract = await WavePortalContract();
  });

  const wave = async () => {
    try {
      let waveTxn = await contract.wave();
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
      const waves = await contract.getTotalWaves();
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
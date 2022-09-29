<script lang="ts">
  import WavePortalContract from "../lib/WavePortal.contract";
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
</script>

<div class="buttons">
  {#if (isLoading)}
    <button class="btn" disabled>Waving...</button>
  {:else}
    <button class="btn" on:click={wave}>Wave at Me</button>
  {/if}
</div>

<script lang="ts">
  import WavePortalContract from "../../lib/WavePortal.contract";
  import {onMount} from "svelte";

  let contract;
  let isLoading = false;


  onMount(async () => {
    contract = await WavePortalContract();
  });

  async function resetWaves() {
    let resetWavesTxn = await contract.resetWaves();
    isLoading = true;
    await resetWavesTxn.wait();
    isLoading = false;

    window.dispatchEvent(new Event("resetWaves"));
  }
</script>

{#if (isLoading)}
  <button class="btn btn-danger" disabled>Resetting...</button>
{:else}
  <button class="btn btn-danger" on:click={resetWaves}>Reset Waves</button>
{/if}

<style>
  .btn-danger {
    background: #cb0c0c;
    color: antiquewhite;
  }

  .btn-danger:disabled {
    color: #b9acac;
  }
</style>
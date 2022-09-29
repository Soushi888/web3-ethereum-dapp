<script lang="ts">
  import WavePortalContract from "../../lib/WavePortal.contract";
  import {onMount} from "svelte";

  let contract;

  onMount(async () => {
    contract = await WavePortalContract();
  });

  const getWaves = async () => {
    try {
      const waves = await contract.getTotalWaves();
      alert(`Total waves: ${waves}`);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<button class="btn" on:click={getWaves}>Waves Count</button>

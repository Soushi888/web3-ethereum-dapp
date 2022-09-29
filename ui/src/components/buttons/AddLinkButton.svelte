<script lang="ts">
  import WavePortalContract from "../../lib/WavePortal.contract";
  import {onMount} from "svelte";

  let contract;
  let isLoading = false;

  onMount(async () => {
    contract = await WavePortalContract();
  });

  const addLink = async () => {
    try {
      let youtubeUrl = prompt("Please enter your YouTube URL");
      let linkTxn = await contract.addLink(youtubeUrl);
      isLoading = true;
      console.log("Mining...", linkTxn.hash);
      await linkTxn.wait();
      isLoading = false;
      alert("Link added!");
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }
</script>

{#if (isLoading)}
  <button class="btn" disabled>Adding Link...</button>
{:else}
  <button class="btn" on:click={addLink}>Add a Link</button>
{/if}

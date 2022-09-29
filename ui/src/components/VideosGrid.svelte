<script lang="ts">
  import WavePortalContract from "../lib/WavePortal.contract";
  import {onMount} from "svelte";
  import YoutubeVideoCard from "./YoutubeVideoCard.svelte";

  let contract, links = [];

  onMount(async () => {
    contract = await WavePortalContract();
    links = (await contract.getLinks()).map(link => link[0]);
  });
</script>

<div class="videos-grid">
  {#each links as link}
    <YoutubeVideoCard url={link}/>
  {/each}
</div>


<style>
  .videos-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }
</style>
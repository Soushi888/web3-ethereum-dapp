<script lang="ts">
  import {onMount} from "svelte";
  import WavePortalContract from "../lib/WavePortal.contract";

  export let url;
  let contract, numberOfWaves;
  let isLoading = false;

  onMount(async () => {
    contract = await WavePortalContract();
    const link = await contract.getLink(url);
    numberOfWaves = link.waveCount.toNumber();
  });

  const embedUrl = url.replace("watch?v=", "embed/");

  const getLink = async () => {
    const link = await contract.getLink(url);
    console.log(link);
  };

  const waveLink = async () => {
    const waveTxn = await contract.waveLink(url);
    isLoading = true;
    await waveTxn.wait();
    const link = await contract.getLink(url);
    numberOfWaves = link.waveCount.toNumber();
    isLoading = false;
  };
</script>

<div class="yt-video-card">
  <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope picture-in-picture"
          allowfullscreen>
  </iframe>
  <div class="waves-count">
    <div><span>{numberOfWaves}</span></div>
    {#if !isLoading}
      <button class="btn" on:click={waveLink}>Wave</button>
    {:else}
      <button class="btn" disabled>Waving...</button>
    {/if}
  </div>
</div>

<style>
  .yt-video-card {
    border: black solid 1px;
    border-radius: 5px;
    background: #f5f5f5;
    padding: 15px;
  }

  .waves-count {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .waves-count div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: black solid 1px;
    border-radius: 25px;
    background: #cb0c0c;
    padding: 10px;
  }

  .waves-count div span {
    color: white;
    font-size: 1.5rem;
  }
</style>

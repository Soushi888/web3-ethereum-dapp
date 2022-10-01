<script lang="ts">
  import {onMount} from "svelte";
  import WavePortalContract from "../lib/WavePortal.contract";

  export let url = "";
  let contract, link;
  let cardEl: HTMLDivElement;
  let numberOfWaves = 0;
  let isLoading = false;
  const youtubeUrlRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  const isYoutubeUrl = url.match(youtubeUrlRegex);

  onMount(async () => {
    contract = await WavePortalContract();
    link = await contract.getLink(url);
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
    isLoading = false;

    link = await contract.getLink(url);
    numberOfWaves = link.waveCount.toNumber();
  };

  window.addEventListener("resetWaves", () => numberOfWaves = 0);
</script>

<div class="yt-video-card" class:not-yt-url={!isYoutubeUrl} bind:this={cardEl}>
  {#if isYoutubeUrl}
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
    {:else }
    <h2><a href={url}>{url}</a></h2>
    <p>Is not a youtube URL</p>
  {/if}
</div>

<style>
  .yt-video-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 400px;
    border: black solid 1px;
    border-radius: 5px;
    background: #f5f5f5;
    padding: 15px;
  }

  .waves-count {
    margin-top: 16px;
    width: 100%;
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

  .not-yt-url {
    background: #c76363;
    display: flex;
    justify-content: center;
  }
</style>

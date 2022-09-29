<script lang="ts">
  import {onMount} from "svelte";
  import WavePortalContract from "../lib/WavePortal.contract";

  export let url;
  let contract;

  onMount(async () => {
    contract = await WavePortalContract();
  });

  const embedUrl = url.replace("watch?v=", "embed/");

  const getLink = async () => {
    const link = await contract.getLink(url);
    console.log(link);
  };
</script>

<div class="yt-video-card">
  <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope picture-in-picture"
          allowfullscreen>
  </iframe>
</div>

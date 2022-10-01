<script lang="ts">
  import ConnectWalletButton from "./components/buttons/ConnectWalletButton.svelte";
  import WaveButtons from "./components/buttons/WaveButton.svelte";
  import VideosGrid from "./components/VideosGrid.svelte";
  import CountWaveButton from "./components/buttons/CountWaveButton.svelte";
  import versions from "./utils/versions.json";
  import AddLinkButton from "./components/buttons/AddLinkButton.svelte";
  import ResetButton from "./components/buttons/ResetButton.svelte";

  const {ethereum} = window;
  let status: string, isLogged: boolean, account: string;

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      status = "Metamask is not installed";
      return;
    }
    status = "Metamask is installed";

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if (accounts.length !== 0) {
      account = accounts[0];
      isLogged = true;
    } else {
      isLogged = false;
    }
  };

  const etherScanLink = `https://goerli.etherscan.io/address/${versions.current}`;

  const handleConnected = (event) => {
    account = event.detail.account;
    isLogged = true;
  };

  $: isLogged ? status = "Connected" : status = "Not connected";

  checkIfWalletIsConnected();
</script>

<main>
  <div class="mainContainer">

    <div class="dataContainer">
      <div class="header">
        👋 Hey there!
        <p class={isLogged ? "success" : "fail"}>{status}</p>
        <p>Contract : <a href={etherScanLink} target="_blank">{versions.current}</a></p>
      </div>

      {#if (ethereum && !isLogged)}
          <ConnectWalletButton on:connected={handleConnected}/>
      {/if}

      {#if (isLogged)}
        <div class="buttons">
          <WaveButtons/>
          <CountWaveButton/>
          <AddLinkButton/>
          <ResetButton/>
        </div>
        <div class="videos">
          <VideosGrid/>
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  .mainContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 32px auto;
  }

  .dataContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    gap: 10px;
  }

  .videos {
    margin-top: 16px;
  }

  .success {
    color: green;
  }

  .fail {
    color: red;
  }
</style>
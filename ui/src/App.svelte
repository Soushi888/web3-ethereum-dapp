<script lang="ts">
  import {onMount} from "svelte";
  import ConnectWalletButton from "./ConnectWalletButton.svelte";
  import WaveButton from "./WaveButton.svelte";


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

  const handleConnected = (event) => {
    account = event.detail.account;
    isLogged = true;
  };

  $: isLogged ? status = "Connected" : status = "Not connected";


  onMount(() => {
    checkIfWalletIsConnected();
  });
</script>

<main>
  <div class="mainContainer">

    <div class="dataContainer">
      <div class="header">
        👋 Hey there!
        <p class={isLogged ? "success" : "fail"}>{status}</p>
      </div>

      {#if (ethereum && !isLogged)}
        <div class="btn">
          <ConnectWalletButton on:connected={handleConnected}/>
        </div>
      {/if}

      {#if (isLogged)}
        <div class="btn">
          <WaveButton account={account}/>
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
    margin-top: 64px;
  }

  .dataContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
  }

  .header {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .success {
    color: green;
  }

  .fail {
    color: red;
  }
</style>
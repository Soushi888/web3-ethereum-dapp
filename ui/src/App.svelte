<script lang="ts">
  import {onMount} from "svelte";

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

  $: isLogged ? status = "Connected" : status = "Not connected";

  const connectWallet = async () => {
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    account = accounts[0];

    if (account) {
      isLogged = true;
    }
  };

  const wave = () => {
    alert(`${account} just waved!!`);
  }

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
        <div class="connect-btn">
          <button on:click={connectWallet}>Connect Wallet</button>
        </div>
      {/if}

      {#if (isLogged)}
        <div class="wave-btn">
          <button on:click={wave}>
            Wave at Me
          </button>
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

  .bio {
    text-align: center;
    color: gray;
    margin-top: 16px;
  }

  .wave-btn {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .wave-btn button {
    cursor: pointer;
    margin-top: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
  }

  .connect-btn {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .connect-btn button {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .success {
    color: green;
  }

  .fail {
    color: red;
  }
</style>
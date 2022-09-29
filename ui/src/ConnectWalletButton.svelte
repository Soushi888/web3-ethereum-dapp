<script>
  import {createEventDispatcher} from "svelte";

  const {ethereum} = window;
  const dispatch = createEventDispatcher();

  const connectWallet = async () => {
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    if (accounts[0]) dispatch("connected", {account: accounts[0]});
  };
</script>

<button class="connect-btn" on:click={connectWallet}>Connect Wallet</button>

<style>
  .connect-btn {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
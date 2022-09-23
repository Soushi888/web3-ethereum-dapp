<script>
  name = "Soushi888";

  function wave() {
    alert(`${name} just waved!`);
  }
</script>

<main>
  <div class="mainContainer">

    <div class="dataContainer">
      <div class="header">
        👋 Hey there!
      </div>

      <div class="bio">
        I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
      </div>

      <button class="waveButton" on:click={wave}>
        Wave at Me
      </button>
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

  .waveButton {
    cursor: pointer;
    margin-top: 16px;
    padding: 8px;
    border: 0;
    border-radius: 5px;
  }
</style>
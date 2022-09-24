<script>
  let {ethereum} = window;


  ethereum.on('message', (result) => {
    alert(result);
    console.log(result);
  });
</script>
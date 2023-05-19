<script>
  import { scale } from "svelte/transition";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- <div class="loading-container" on:click|capture|preventDefault>
  <div class="outer" in:scale>
    <div class="inner" />
  </div>
</div> -->

<!-- TODO: if the load is too fast this looks just like a flash and looks kinda bad -->
<style>
  .loading-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(58, 58, 58, 0.322);
    pointer-events: auto;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .outer {
    height: 60px;
    width: 60px;
    border: 5px solid rgba(85, 86, 86, 0.603);
    border-radius: 999px;
    position: relative;
    animation: rotate 2s linear infinite;
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translate(-50%, -50%); */
    background-color: rgba(76, 78, 79, 0.808);
    border-radius: 999px;
    height: 50%;
    width: 50%;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

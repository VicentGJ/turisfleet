<script>
  import { scale } from "svelte/transition";
</script>

<div class="outer" transition:scale>
  <div class="inner" />
</div>

<style>
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

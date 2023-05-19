<script lang="ts">
  export let open = false;
  export let toggle: () => void = () => {
    open = !open;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="toggler-container noselect" on:click={toggle}>
  <h3><slot /></h3>
  <div>
    <img src="/arrow-down.svg" alt="" class:open />
  </div>
</div>

<style>
  .toggler-container {
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    cursor: pointer;
    transition: all;
    transition-duration: 200ms;
  }
  .toggler-container:active {
    transform: scale(95%);
  }
  h3 {
    margin: 0;
  }

  img {
    transition: all;
    transition-duration: 200ms;
    transform: rotate(90deg);
  }
  img.open {
    transform: rotate(0deg);
  }
</style>

<script>
  export let id;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div {id} class="dropdown-item-container noselect" on:click>
  <div class="dropdown-item">
    <slot />
  </div>
</div>

<style>
  .dropdown-item-container {
    width: 100%;
  }
  .dropdown-item {
    padding: 5px 10px;
    cursor: pointer;
  }
  .dropdown-item:hover {
    background-color: var(--item-hover-color);
  }
</style>

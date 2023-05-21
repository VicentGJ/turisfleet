<script>
  import { createEventDispatcher } from 'svelte'
  export let id
  export let disabled = false
  export let open = false
  const dispatch = createEventDispatcher()
  const handleclick = () => {
    if (!disabled) {
      open = false
      dispatch('click')
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  {id}
  class="dropdown-item-container noselect"
  class:disabled
  on:click={handleclick}
>
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
  .disabled {
    pointer-events: none;
    opacity: 0.4;
  }
</style>

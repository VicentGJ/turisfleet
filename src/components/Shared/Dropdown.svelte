<script>
  import { fly } from "svelte/transition";
</script>

<div class="dropdown-main-container" transition:fly={{ duration: 200, y: -20 }}>
  <div class="items-container">
    <slot />
  </div>
</div>

<style>
  .dropdown-main-container {
    z-index: 50;
    position: absolute;
    right: 0;
    left: 15px;
    top: 30px;
    width: 250px;
    background-color: white;
    box-shadow: var(--default-shadow);
    border-radius: 4px;
  }
  .items-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
</style>

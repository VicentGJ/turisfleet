<script>
  import { createEventDispatcher } from "svelte";
  export let tabs = [];
  const dispatch = createEventDispatcher();
  const changeTab = (index) => {
    dispatch("change-tab", index);
  };
</script>

<div class="tabs-container">
  {#each tabs as { name, active, id }, index (id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      {id}
      class="tab noselect"
      class:active
      on:click={() => changeTab(index)}
    >
      {name}
    </div>
  {/each}
</div>

<style>
  .tabs-container {
    display: flex;
    flex-direction: row;
    background-color: white;
    padding-top: 20px;
    border-radius: 4px;
  }
  .tab {
    width: 100%;
    padding: 8px 16px 9px;
    display: flex;
    justify-content: center;
    font-weight: 400;
    gap: 0;
    border-style: solid;
    border-color: #c0c4c8;
    border-width: 0 0 1px 0;
    border-radius: 4px 4px 0px 0px;
    color: #009fa3;
  }
  .active {
    color: #495057;
    border-width: 1px 1px 0px 1px;
    border-radius: 4px 4px 0px 0px;
  }
</style>

<script lang="ts">
  import { view } from '$/lib/stores/basic_stores'
  import type { PanelItemType } from '$/lib/types/PanelTypes'
  import { goto } from '$app/navigation'
  import { fly } from 'svelte/transition'
  export let item: PanelItemType
  export let isSubItem = false
  let showSubItems = false
  const handleItemClick = async () => {
    if ($view != item.route) {
      $view = item.route
      await goto($view)
    }
  }
  const handleArrowClick = () => {
    showSubItems = !showSubItems
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="panel-item noselect"
  class:active={$view == item.route}
  class:sub-item={isSubItem}
  on:click={handleItemClick}
>
  <div class="name-container">
    <div>
      {item.name}
    </div>
    {#if item.subItems.length}
      <div
        on:click|capture|stopPropagation|preventDefault={handleArrowClick}
        class:open={showSubItems}
        class="arrow-wrapper"
      >
        <img src="/arrow-down.svg" alt="" />
      </div>
    {/if}
  </div>
</div>
{#if showSubItems}
  <div class="sub-items" transition:fly={{ y: -10, duration: 200 }}>
    {#each item.subItems as subitem}
      <svelte:self bind:item={subitem} isSubItem={true} />
    {/each}
  </div>
{/if}

<style>
  .panel-item {
    background-color: white;
    padding: 15px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: var(--default-shadow);
  }
  .panel-item:hover {
    transition: all;
    transition-duration: 200ms;
    transform: scale(103%);
    background-color: rgb(148 163 184 / 0.3);
  }
  .active {
    background: #f1f8f9;
    color: #009fa3;
  }
  .sub-items {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    margin-top: 5px;
    gap: 3px;
  }
  .name-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .arrow-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 90%;
    width: 20px;
    height: 20px;
    transition: all;
    transition-duration: 200ms;
    transform: rotate(90deg);
  }
  .arrow-wrapper.open {
    transform: rotate(0deg);
  }
  .arrow-wrapper:hover {
    background-color: rgba(148, 163, 184, 0.424);
  }
</style>

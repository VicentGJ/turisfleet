<script lang="ts">
  import { view } from "$/lib/stores/basic_stores";

  export let item: any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="panel-item"
  class:active={$view == item.route}
  on:click={() => item.click()}
>
  {item.name}
</div>

<style>
  .panel-item {
    background-color: white;
    padding: 15px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0px 1px 4px 0px #5a5a5a94;
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
</style>

<script lang="ts">
  import { loading } from "$/lib/stores/basic_stores";
  import { goto } from "$app/navigation";
  import { view } from "$stores/basic_stores";
  import PanelItem from "./PanelItem.svelte";

  async function click(this: any) {
    $view = this.route;
   
    await goto($view);
    
  }
  const panelItems = [
    {
      route: "drivers",
      name: "Drivers",
      click: click,
    },
    {
      route: "cars",
      name: "Cars",
      click: click,
    },
    {
      route: "groups",
      name: "Groups",
      click: click,
    },
    {
      route: "requests",
      name: "Requests",
      click: click,
    },
    {
      route: "programs",
      name: "Programs",
      click: click,
    },
    {
      route: "situations",
      name: "Situations",
      click: click,
    },
  ];
</script>

<div id="panel-container">
  <h1>Turis Fleet</h1>
  {#each panelItems as item}
    <PanelItem bind:item />
  {/each}
</div>

<style>
  #panel-container {
    background-color: #ffffffed;
    min-width: fit-content;
    height: 100%;
    padding: 30px 15px 0 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    margin-left: 4px;
    border-radius: 8px;
  }
  h1 {
    margin: 0;
  }
</style>

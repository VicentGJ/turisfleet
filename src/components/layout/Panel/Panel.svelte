<script lang="ts">
  import type { PanelItemType } from "$lib/types/PanelTypes";
  import PanelItem from "./PanelItem.svelte";

  const panelItems: PanelItemType[] = [
    {
      route: "drivers",
      name: "Drivers",
      subItems: [],
    },
    {
      route: "cars",
      name: "Cars",
      subItems: [],
    },
    {
      route: "groups",
      name: "Groups",
      subItems: [],
    },
    {
      route: "requests",
      name: "Requests",
      subItems: [],
    },
    {
      route: "programs",
      name: "Programs",
      subItems: [
        {
          route: "programs/specific",
          name: "Specific Programs",
          subItems: [],
        },
      ],
    },
    {
      route: "situations",
      name: "Situations",
      subItems: [
        {
          route: "situations/car",
          name: "Car Situations",
          subItems: [],
        },
        {
          route: "situations/driver",
          name: "Driver Situations",
          subItems: [],
        },
      ],
    },
  ];
</script>

<div id="panel-container">
  <div class="items-container">
    {#each panelItems as item}
      <div class="item">
        <PanelItem bind:item />
      </div>
    {/each}
  </div>
</div>

<style>
  #panel-container {
    background-color: #ffffffed;
    width: 220px;
    height: 100%;
    margin-left: 4px;
    border-radius: 8px;
  }
  .items-container {
    height: calc(100% - 20px);
    position: relative;
    flex-direction: column;
    overflow-y: scroll;
    padding: 10px;
    display: flex;
    gap: 20px;
  }
</style>

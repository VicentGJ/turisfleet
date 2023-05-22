<script lang="ts">
  import type { PanelItemType } from '$lib/types/PanelTypes'
  import PanelItem from './PanelItem.svelte'

  const panelItems: PanelItemType[] = [
    {
      route: 'turisfleet/drivers',
      name: 'Drivers',
      subItems: [],
    },
    {
      route: 'turisfleet/cars',
      name: 'Cars',
      subItems: [],
    },
    {
      route: 'turisfleet/groups',
      name: 'Groups',
      subItems: [],
    },
    {
      route: 'turisfleet/requests',
      name: 'Requests',
      subItems: [],
    },
    {
      route: 'turisfleet/programs',
      name: 'Programs',
      subItems: [
        {
          route: 'turisfleet/programs/specific',
          name: 'Specific Programs',
          subItems: [],
        },
      ],
    },
    {
      route: 'turisfleet/situations',
      name: 'Situations',
      subItems: [
        {
          route: 'turisfleet/situations/car',
          name: 'Car Situations',
          subItems: [],
        },
        {
          route: 'turisfleet/situations/driver',
          name: 'Driver Situations',
          subItems: [],
        },
      ],
    },
  ]
</script>

<div class="panel-wrapper">
  <div class="items-container">
    {#each panelItems as item}
      <div class="item">
        <PanelItem bind:item />
      </div>
    {/each}
  </div>
</div>

<style>
  .panel-wrapper {
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

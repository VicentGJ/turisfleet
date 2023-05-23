<script lang="ts">
  import { loggedUser } from '$/lib/stores/basic_stores'
  import type { PanelItemType } from '$lib/types/PanelTypes'
  import PanelItem from './PanelItem.svelte'

  const panelItems: PanelItemType[] = [
    {
      route: '/turisfleet/users',
      name: 'Users',
      subItems: [],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'support',
    },
    {
      route: '/turisfleet/drivers',
      name: 'Drivers',
      subItems: [],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
    {
      route: '/turisfleet/cars',
      name: 'Cars',
      subItems: [],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
    {
      route: '/turisfleet/groups',
      name: 'Groups',
      subItems: [],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
    {
      route: '/turisfleet/requests',
      name: 'Requests',
      subItems: [],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
    {
      route: '/turisfleet/programs',
      name: 'Programs',
      subItems: [
        {
          route: '/turisfleet/programs/specific',
          name: 'Specific Programs',
          subItems: [],
          show:
            $loggedUser.role_name === 'administrator' ||
            $loggedUser.role_name === 'agent',
        },
      ],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
    {
      route: '/turisfleet/situations',
      name: 'Situations',
      subItems: [
        {
          route: '/turisfleet/situations/car',
          name: 'Car Situations',
          subItems: [],
          show:
            $loggedUser.role_name === 'administrator' ||
            $loggedUser.role_name === 'agent',
        },
        {
          route: '/turisfleet/situations/driver',
          name: 'Driver Situations',
          subItems: [],
          show:
            $loggedUser.role_name === 'administrator' ||
            $loggedUser.role_name === 'agent',
        },
      ],
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
  ]
</script>

<div class="panel-wrapper">
  <div class="items-container">
    {#each panelItems as item}
      {#if item.show}
        <div class="item">
          <PanelItem bind:item />
        </div>
      {/if}
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

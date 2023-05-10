<script lang="ts">
  import Tabs from "$/components/Shared/Tabs.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { situationView } from "$/lib/stores/basic_stores";
  import { browser } from "$app/environment";
  import Loading from "$components/Shared/Loading.svelte";
  import { situationService } from "$services";
  let requestCompleted = false;
  let items: [] = [];
  $: tabs = [
    {
      name: "Car Situations",
      id: "car-situations",
      active: $situationView === "car-situations",
    },
    {
      name: "Driver Situations",
      id: "driver-situations",
      active: $situationView === "driver-situations",
    },
    {
      name: "Situations",
      id: "situations",
      active: $situationView === "situations",
    },
  ];

  $: if (browser && $situationView) {
    items = [];
    requestCompleted = false;
    switch ($situationView) {
      case "car-situations":
        situationService.getCarSituations().then((i) => {
          requestCompleted = true;
          items = i;
        });
        break;
      case "driver-situations":
        situationService.getDriverSituations().then((i) => {
          requestCompleted = true;
          items = i;
        });
        break;
      case "situations":
        situationService.getSituations().then((i) => {
          requestCompleted = true;
          items = i;
        });
        break;
    }
  }

  const handleRowClick = ({ detail }: any) => {};

  const changeView = ({ detail }: any) => {
    const index = detail;
    const temp = tabs;
    tabs = [];
    temp.forEach((tab, i) => {
      const t = tab;
      t.active = i === index;
      if (t.active) {
        $situationView = t.id;
      }
      tabs = [...tabs, t];
    });
  };
</script>

<Tabs bind:tabs on:change-tab={changeView} />
{#if items.length || requestCompleted}
  <Table bind:items on:row-clicked={handleRowClick} />
{:else}
  <div class="loading-container">
    <Loading />
  </div>
{/if}

<style>
  .loading-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>

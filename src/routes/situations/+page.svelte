<script lang="ts">
  import CreateCarSituation from "$/components/Forms/Situation/CreateCarSituation.svelte";
  import CreateDriverSituation from "$/components/Forms/Situation/CreateDriverSituation.svelte";
  import CreateSituation from "$/components/Forms/Situation/CreateSituation.svelte";
  import UpdateCarSituation from "$/components/Forms/Situation/UpdateCarSituation.svelte";
  import UpdateDriverSituation from "$/components/Forms/Situation/UpdateDriverSituation.svelte";
  import UpdateSituation from "$/components/Forms/Situation/UpdateSituation.svelte";
  import Tabs from "$/components/Shared/Tabs.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { situationView } from "$/lib/stores/basic_stores";
  import type {
    CarSituation,
    DriverSituation,
    Situation,
  } from "$/lib/types/SituationTypes";
  import { browser } from "$app/environment";
  import { situationService } from "$services";
  import { loading } from "$stores/basic_stores";
  let showCreateSituation = false;
  let showCreateCarSituation = false;
  let showCreateDriverSituation = false;
  let showUpdateSituation = false;
  let showUpdateCarSituation = false;
  let showUpdateDriverSituation = false;
  let itemToUpdate: CarSituation | DriverSituation | Situation;
  let items: Array<CarSituation | DriverSituation | Situation>;

  let createButtonText = "";
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
    $loading = true;
    refreshItems();
    switch ($situationView) {
      case "car-situations":
        createButtonText = "Insert Car Situation";
        break;
      case "driver-situations":
        createButtonText = "Insert Driver Situation";
        break;
      case "situations":
        createButtonText = "Insert Situation";
        break;
    }
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail;
    switch ($situationView) {
      case "situations":
        showUpdateSituation = true;
        break;
      case "car-situations":
        showUpdateCarSituation = true;
        break;
      case "driver-situations":
        showUpdateDriverSituation = true;
        break;
    }
  };
  const handleCreateClicked = () => {
    switch ($situationView) {
      case "situations":
        showCreateSituation = true;
        break;
      case "car-situations":
        showCreateCarSituation = true;
        break;
      case "driver-situations":
        showCreateDriverSituation = true;
        break;
    }
  };
  const handleDeleteClicked = ({ detail }: any) => {
    $loading = true;
    switch ($situationView) {
      case "car-situations":
        situationService
          .deleteCarSituation({
            car_id_car: detail.car_id_car,
            date: detail.date,
          })
          .then(() => refreshItems());
        break;
      case "driver-situations":
        situationService
          .deleteDriverSituation({
            driver_id_driver: detail.driver_id_driver,
            date: detail.date,
          })
          .then(() => refreshItems());
        break;
      case "situations":
        situationService
          .deleteSituation(detail.id_situation)
          .then(() => refreshItems());
        break;
    }
  };
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

  const refreshItems = () => {
    $loading = true;
    switch ($situationView) {
      case "situations":
        situationService.getSituations().then((i) => {
          $loading = false;
          items = i;
        });
        break;
      case "car-situations":
        situationService.getCarSituations().then((i) => {
          $loading = false;
          items = i;
        });
        break;
      case "driver-situations":
        situationService.getDriverSituations().then((i) => {
          $loading = false;
          items = i;
        });
        break;
    }
  };
</script>

<Tabs bind:tabs on:change-tab={changeView} />
<Table
  bind:items
  bind:createButtonText
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreateSituation}
  <CreateSituation
    bind:showCreate={showCreateSituation}
    on:created={refreshItems}
  />
{/if}
{#if showCreateCarSituation}
  <CreateCarSituation
    bind:showCreate={showCreateCarSituation}
    on:created={refreshItems}
  />
{/if}
{#if showCreateDriverSituation}
  <CreateDriverSituation
    bind:showCreate={showCreateDriverSituation}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateSituation}
  <UpdateSituation
    bind:itemToUpdate
    bind:showUpdate={showUpdateSituation}
    on:updated={refreshItems}
  />
{/if}
{#if showUpdateCarSituation}
  <UpdateCarSituation
    bind:itemToUpdate
    bind:showUpdate={showUpdateCarSituation}
    on:updated={refreshItems}
  />
{/if}
{#if showUpdateDriverSituation}
  <UpdateDriverSituation
    bind:itemToUpdate
    bind:showUpdate={showUpdateDriverSituation}
    on:updated={refreshItems}
  />
{/if}

<script lang="ts">
  import CreateCarSituation from "$/components/Forms/Situation/CreateCarSituation.svelte";
  import UpdateCarSituation from "$/components/Forms/Situation/UpdateCarSituation.svelte";
  import Table from "$/components/Table/Table.svelte";
  import type { CarSituation } from "$/lib/types/SituationTypes";
  import { browser } from "$app/environment";
  import { situationService } from "$services";
  import { view } from "$stores/basic_stores";
  let showCreateCarSituation = false;
  let showUpdateCarSituation = false;
  let itemToUpdate: CarSituation;
  let items: CarSituation[];
  let createButtonText = "Insert Car Situation";
  let tablename = "Car Situations";
  $: if (browser && $view) {
    items = [];
    refreshItems();
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail;
    showUpdateCarSituation = true;
  };
  const handleCreateClicked = () => {
    showCreateCarSituation = true;
  };
  const handleDeleteClicked = ({ detail }: any) => {
    situationService
      .deleteCarSituation({
        car_id_car: detail.car_id_car,
        date: detail.date,
      })
      .then(() => refreshItems());
  };

  const refreshItems = () => {
    situationService.getCarSituations().then((i) => {
      items = i;
    });
  };
</script>

<Table
  bind:tablename
  bind:items
  bind:createButtonText
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreateCarSituation}
  <CreateCarSituation
    bind:showCreate={showCreateCarSituation}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateCarSituation}
  <UpdateCarSituation
    bind:itemToUpdate
    bind:showUpdate={showUpdateCarSituation}
    on:updated={refreshItems}
  />
{/if}

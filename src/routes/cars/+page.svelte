<script lang="ts">
  import type { Car } from "$lib/types/CarTypes";
  import Table from "$/components/Table/Table.svelte";
  import { carService } from "$/lib/services/services";
  import { loading } from "$/lib/stores/basic_stores";
  import CreateCar from "$/components/Forms/Car/CreateCar.svelte";
  import { onMount } from "svelte";
  import UpdateCar from "$/components/Forms/Car/UpdateCar.svelte";
  let items: Car[];
  let showCreate = false;
  let showUpdate = false;
  let itemToUpdate: Car;
  onMount(() => {
    refreshItems();
  });
  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail;
    showUpdate = true;
  };
  const handleCreateClicked = () => {
    showCreate = true;
  };
  const handleDeleteClicked = ({ detail }: any) => {
   
    carService.deleteCar(detail.plate_number).then(() => refreshItems());
  };
  const refreshItems = () => {
   
    carService.getCars().then((i) => {
      
      items = i;
    });
  };
</script>

<Table
  bind:items
  createButtonText="Insert Car"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreate}
  <CreateCar bind:showCreate on:created={refreshItems} />
{/if}
{#if showUpdate}
  <UpdateCar bind:showUpdate on:updated={refreshItems} bind:itemToUpdate />
{/if}

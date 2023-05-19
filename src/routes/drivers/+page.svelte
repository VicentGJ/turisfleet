<script lang="ts">
  import CreateDriver from "$/components/Forms/Driver/CreateDriver.svelte";
  import UpdateDriver from "$/components/Forms/Driver/UpdateDriver.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { driverService } from "$/lib/services/services";
  import type { Driver } from "$/lib/types/DriverTypes";
  import { onMount } from "svelte";
  let items: Driver[];
  let showCreate = false;
  let showUpdate = false;
  let itemToUpdate: Driver;
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
   
    driverService.deleteDriver(detail.id_number).then(() => refreshItems());
  };

  const refreshItems = () => {
   
    driverService.getDrivers().then((i) => {
      
      items = i;
    });
  };
</script>

<Table
  bind:items
  createButtonText="Insert Driver"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>

{#if showCreate}
  <CreateDriver bind:showCreate on:created={refreshItems} />
{/if}
{#if showUpdate}
  <UpdateDriver bind:showUpdate on:updated={refreshItems} bind:itemToUpdate />
{/if}

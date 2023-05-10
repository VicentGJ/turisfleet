<script>
  import CreateDriver from "$/components/Forms/Driver/CreateDriver.svelte";
  import UpdateDriver from "$/components/Forms/Driver/UpdateDriver.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { driverService } from "$/lib/services/services";
  import { loading } from "$/lib/stores/basic_stores";
  import { onMount } from "svelte";
  let items = [];
  let showCreate = false;
  let showUpdate = false;
  let itemToUpdate;
  onMount(() => {
    refreshItems();
  });
  const handleRowClick = ({ detail }) => {
    itemToUpdate = detail;
    showUpdate = true;
  };
  const handleCreateClicked = () => {
    showCreate = true;
  };
  const handleDeleteClicked = ({ detail }) => {
    $loading = true;
    driverService.deleteDriver(detail.id_number).then(() => refreshItems());
  };

  const refreshItems = () => {
    $loading = true;
    driverService.getDrivers().then((i) => {
      $loading = false;
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

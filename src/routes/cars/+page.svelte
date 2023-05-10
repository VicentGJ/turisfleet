<script>
  import Table from "$/components/Table/Table.svelte";
  import { carService } from "$/lib/services/services";
  import { loading } from "$/lib/stores/basic_stores";
  import Create from "$/components/Forms/Car/CreateCar.svelte";
  import { onMount } from "svelte";
  let items = [];
  let showCreate = false;
  onMount(() => {
    refreshItems();
  });
  const handleRowClick = ({ detail }) => {};
  const handleCreateClicked = () => {
    showCreate = true;
  };
  const handleDeleteClicked = ({ detail }) => {
    $loading = true;
    carService.deleteCar(detail.plate_number).then(() => refreshItems());
  };
  const refreshItems = () => {
    $loading = true;
    carService.getCars().then((i) => {
      $loading = false;
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
  <Create bind:showCreate on:created={refreshItems} />
{/if}

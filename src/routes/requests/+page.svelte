<script>
  import CreateRequest from "$/components/Forms/Request/CreateRequest.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { loading } from "$/lib/stores/basic_stores";
  import { requestService } from "$services";
  import { onMount } from "svelte";
  let items = [];
  let showCreate = true;
  onMount(() => {
    refreshItems();
  });
  const handleRowClick = ({ detail }) => {};
  const handleCreateClicked = () => {
    showCreate = true;
  };
  const handleDeleteClicked = ({ detail }) => {
    $loading = true;
    requestService.deleteRequest(detail.id_request).then(() => refreshItems());
  };
  const refreshItems = () => {
    $loading = true;
    requestService.getRequests().then((i) => {
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
  <CreateRequest bind:showCreate on:created={refreshItems} />
{/if}

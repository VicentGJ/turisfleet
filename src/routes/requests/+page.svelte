<script>
  import UpdateRequest from "$components/Forms/Request/UpdateRequest.svelte";
  import CreateRequest from "$/components/Forms/Request/CreateRequest.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { loading } from "$/lib/stores/basic_stores";
  import { requestService } from "$services";
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
  createButtonText="Insert Request"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreate}
  <CreateRequest bind:showCreate on:created={refreshItems} />
{/if}

{#if showUpdate}
  <UpdateRequest bind:showUpdate on:updated={refreshItems} bind:itemToUpdate />
{/if}

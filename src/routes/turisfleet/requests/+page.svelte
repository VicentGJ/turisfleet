<script lang="ts">
  import UpdateRequest from "$components/Forms/Request/UpdateRequest.svelte";
  import CreateRequest from "$/components/Forms/Request/CreateRequest.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { requestService } from "$services";
  import { onMount } from "svelte";
  import type { Request } from "$/lib/types/RequestTypes";
  let items: Request[];
  let showCreate = false;
  let showUpdate = false;
  let itemToUpdate: Request;
  let tablename = "Requests";
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
    requestService.deleteRequest(detail.id_request).then(() => refreshItems());
  };
  const refreshItems = () => {
    requestService.getRequests().then((i) => {
      items = i;
    });
  };
</script>

<Table
  bind:tablename
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

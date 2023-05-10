<script>
  import Table from "$/components/Table/Table.svelte";
  import { groupService } from "$/lib/services/services";
  import { loading } from "$/lib/stores/basic_stores";
  import CreateGroup from "$components/Forms/Group/CreateGroup.svelte";
  import UpdateGroup from "$/components/Forms/Group/UpdateGroup.svelte";
  import { onMount } from "svelte";
  let items = [];
  let showCreate = false;
  let showUpdate = false;
  let itemToUpdate = false;
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
    groupService.deleteGroup(detail.id_group).then(() => refreshItems());
  };
  const refreshItems = () => {
    $loading = true;
    groupService.getGroups().then((i) => {
      $loading = false;
      items = i;
    });
  };
</script>

<Table
  bind:items
  createButtonText="Insert Group"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreate}
  <CreateGroup bind:showCreate on:created={refreshItems} />
{/if}

{#if showUpdate}
  <UpdateGroup bind:showUpdate on:updated={refreshItems} bind:itemToUpdate />
{/if}

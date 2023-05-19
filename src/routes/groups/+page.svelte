<script lang="ts">
  import Table from "$/components/Table/Table.svelte";
  import { groupService } from "$/lib/services/services";
  import CreateGroup from "$components/Forms/Group/CreateGroup.svelte";
  import UpdateGroup from "$/components/Forms/Group/UpdateGroup.svelte";
  import { onMount } from "svelte";
  import type { Group } from "$/lib/types/GroupTypes";
  let items: Group[];
  let showCreate = false;
  let showUpdate = false;
  let itemToUpdate: Group;
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
   
    groupService.deleteGroup(detail.id_group).then(() => refreshItems());
  };
  const refreshItems = () => {
   
    groupService.getGroups().then((i) => {
      
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

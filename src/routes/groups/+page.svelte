<script>
  import Loading from "$components/Shared/Loading.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { groupService } from "$/lib/services/services";
  import { onMount } from "svelte";
  let requestCompleted = false;
  let items = [];
  onMount(() => {
    groupService.getGroups().then((i) => {
      requestCompleted = true;
      items = i;
    });
  });
  const handleRowClick = ({ detail }) => {};
</script>

{#if items.length || requestCompleted}
  <Table bind:items on:row-clicked={handleRowClick} />
{:else}
  <div class="loading-container">
    <Loading />
  </div>
{/if}

<style>
  .loading-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>

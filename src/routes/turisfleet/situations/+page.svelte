<script lang="ts">
  import CreateCarSituation from "$/components/Forms/Situation/CreateCarSituation.svelte";
  import CreateDriverSituation from "$/components/Forms/Situation/CreateDriverSituation.svelte";
  import CreateSituation from "$/components/Forms/Situation/CreateSituation.svelte";
  import UpdateCarSituation from "$/components/Forms/Situation/UpdateCarSituation.svelte";
  import UpdateDriverSituation from "$/components/Forms/Situation/UpdateDriverSituation.svelte";
  import UpdateSituation from "$/components/Forms/Situation/UpdateSituation.svelte";
  import Table from "$/components/Table/Table.svelte";
  import type { Situation } from "$/lib/types/SituationTypes";
  import { browser } from "$app/environment";
  import { situationService } from "$services";
  import { view } from "$stores/basic_stores";
  let showCreateSituation = false;
  let showUpdateSituation = false;
  let itemToUpdate: Situation;
  let items: Situation[];
  let createButtonText = "Insert Situation";
  let tablename = "Situations";
  $: if (browser && $view) {
    items = [];
    refreshItems();
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail;
    showUpdateSituation = true;
  };
  const handleCreateClicked = () => {
    showCreateSituation = true;
  };
  const handleDeleteClicked = ({ detail }: any) => {
    situationService
      .deleteSituation(detail.id_situation)
      .then(() => refreshItems());
  };

  const refreshItems = () => {
    situationService.getSituations().then((i) => {
      items = i;
    });
  };
</script>

<Table
  bind:tablename
  bind:items
  bind:createButtonText
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreateSituation}
  <CreateSituation
    bind:showCreate={showCreateSituation}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateSituation}
  <UpdateSituation
    bind:itemToUpdate
    bind:showUpdate={showUpdateSituation}
    on:updated={refreshItems}
  />
{/if}

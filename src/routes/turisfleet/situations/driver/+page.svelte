<script lang="ts">
  import CreateDriverSituation from '$/components/Forms/Situation/CreateDriverSituation.svelte'
  import UpdateDriverSituation from '$/components/Forms/Situation/UpdateDriverSituation.svelte'
  import Table from '$/components/Table/Table.svelte'
  import type { DriverSituation } from '$/lib/types/SituationTypes'
  import { browser } from '$app/environment'
  import { situationService } from '$services'
  import { view } from '$stores/basic_stores'
  let showCreateDriverSituation = false
  let showUpdateDriverSituation = false
  let itemToUpdate: DriverSituation
  let items: DriverSituation[]
  let createButtonText = 'Insert Driver Situation'
  let tablename = 'Driver Situations'

  $: if (browser && $view) {
    items = []
    refreshItems()
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail
    showUpdateDriverSituation = true
  }
  const handleCreateClicked = () => {
    showCreateDriverSituation = true
  }
  const handleDeleteClicked = ({ detail }: any) => {
    situationService
      .deleteDriverSituation({
        driver_id_driver: detail.driver_id_driver,
        date: detail.date,
      })
      .then(() => refreshItems())
  }

  const refreshItems = () => {
    situationService.getDriverSituations().then((i) => {
      items = i
    })
  }
</script>

<Table
  bind:tablename
  bind:items
  bind:createButtonText
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreateDriverSituation}
  <CreateDriverSituation
    bind:showCreate={showCreateDriverSituation}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateDriverSituation}
  <UpdateDriverSituation
    bind:itemToUpdate
    bind:showUpdate={showUpdateDriverSituation}
    on:updated={refreshItems}
  />
{/if}

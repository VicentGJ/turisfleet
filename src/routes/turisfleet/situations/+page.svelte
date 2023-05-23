<script lang="ts">
  import CreateSituation from '$/components/Forms/Situation/CreateSituation.svelte'
  import UpdateSituation from '$/components/Forms/Situation/UpdateSituation.svelte'
  import Table from '$/components/Table/Table.svelte'
  import type { Situation } from '$/lib/types/SituationTypes'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { authService, situationService } from '$services'
  import { page } from '$app/stores'
  import { view } from '$stores/basic_stores'
  let routes: string[] = []
  if (browser) {
    routes = authService.getAuthorizedRoutes()
    if (!routes.includes($page.url.pathname)) {
      $view = routes[0]
      goto($view)
    }
  }

  let showCreateSituation = false
  let showUpdateSituation = false
  let itemToUpdate: Situation
  let items: Situation[]
  let createButtonText = 'Insert Situation'
  let tablename = 'Situations'
  $: if (browser && $view) {
    items = []
    routes.includes($page.url.pathname) && refreshItems()
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail
    showUpdateSituation = true
  }
  const handleCreateClicked = () => {
    showCreateSituation = true
  }
  const handleDeleteClicked = ({ detail }: any) => {
    situationService
      .deleteSituation(detail.id_situation)
      .then(() => refreshItems())
  }

  const refreshItems = () => {
    situationService.getSituations().then((i) => {
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

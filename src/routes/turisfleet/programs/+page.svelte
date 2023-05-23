<script lang="ts">
  import CreateProgram from '$/components/Forms/Program/CreateProgram.svelte'
  import UpdateProgram from '$/components/Forms/Program/UpdateProgram.svelte'
  import Table from '$/components/Table/Table.svelte'
  import { view } from '$/lib/stores/basic_stores'
  import type { Program, SpecificProgram } from '$/lib/types/ProgramTypes'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { authService, programService } from '$services'
  let routes: string[] = []
  if (browser) {
    routes = authService.getAuthorizedRoutes()
    if (!routes.includes($view)) {
      $view = routes[0]
      goto($view)
    }
  }

  let showCreateProgram = false
  let createButtonText = 'Insert Program'
  let showUpdateProgram = false
  let tablename = 'Programs'
  let itemToUpdate: Program | SpecificProgram
  let items: Array<Program | SpecificProgram>

  $: if (browser && $view) {
    routes.includes($view) && refreshItems()
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail
    showUpdateProgram = true
  }
  const handleCreateClicked = () => {
    showCreateProgram = true
  }
  const handleDeleteClicked = ({ detail }: any) => {
    programService.deleteProgram(detail.id_program).then(() => refreshItems())
  }

  const refreshItems = () => {
    programService.getPrograms().then((i) => {
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
{#if showCreateProgram}
  <CreateProgram
    bind:showCreate={showCreateProgram}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateProgram}
  <UpdateProgram
    bind:showUpdate={showUpdateProgram}
    on:updated={refreshItems}
    bind:itemToUpdate
  />
{/if}

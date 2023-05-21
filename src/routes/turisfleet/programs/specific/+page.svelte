<script lang="ts">
  import CreateProgram from '$/components/Forms/Program/CreateProgram.svelte'
  import CreateSpecificProgram from '$/components/Forms/Program/CreateSpecificProgram.svelte'
  import UpdateProgram from '$/components/Forms/Program/UpdateProgram.svelte'
  import Table from '$/components/Table/Table.svelte'
  import { view } from '$/lib/stores/basic_stores'
  import type { SpecificProgram } from '$/lib/types/ProgramTypes'
  import { browser } from '$app/environment'
  import UpdateSpecificProgram from '$components/Forms/Program/UpdateSpecificProgram.svelte'
  import { durationObjToStr } from '$lib/utils'
  import { programService } from '$services'
  let showCreateSpecificProgram = false
  let showUpdateSpecificProgram = false
  let itemToUpdate: SpecificProgram
  let items: Array<SpecificProgram>
  let createButtonText = 'Insert Specific Program'
  let tablename = 'Specific Programs'
  $: if (browser && $view) {
    items = []
    refreshItems()
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail
    showUpdateSpecificProgram = true
  }
  const handleCreateClicked = () => {
    showCreateSpecificProgram = true
  }
  const handleDeleteClicked = ({ detail }: any) => {
    programService
      .deleteSpecificProgram(detail.id_specific_program)
      .then(() => refreshItems())
  }

  const refreshItems = () => {
    programService.getSpecificPrograms().then((i) => {
      i.map((i: any) => {
        i['duration'] = durationObjToStr(i.duration)
        return i
      })
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
{#if showCreateSpecificProgram}
  <CreateSpecificProgram
    bind:showCreate={showCreateSpecificProgram}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateSpecificProgram}
  <UpdateSpecificProgram
    bind:showUpdate={showUpdateSpecificProgram}
    on:updated={refreshItems}
    bind:itemToUpdate
  />
{/if}

<script lang="ts">
  import UpdateGroup from '$/components/Forms/Group/UpdateGroup.svelte'
  import Table from '$/components/Table/Table.svelte'
  import { groupService } from '$/lib/services/services'
  import { view } from '$/lib/stores/basic_stores'
  import type { Group } from '$/lib/types/GroupTypes'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import CreateGroup from '$components/Forms/Group/CreateGroup.svelte'
  import { authService } from '$services'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  let items: Group[]
  let showCreate = false
  let showUpdate = false
  let itemToUpdate: Group
  let tablename = 'Groups'
  let routes: string[] = []
  if (browser) {
    routes = authService.getAuthorizedRoutes()
    if (!routes.includes($page.url.pathname)) {
      $view = routes[0]
      goto($view)
    }
  }

  onMount(() => {
    routes.includes($page.url.pathname) && refreshItems()
  })
  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail
    showUpdate = true
  }
  const handleCreateClicked = () => {
    showCreate = true
  }
  const handleDeleteClicked = ({ detail }: any) => {
    groupService.deleteGroup(detail.id_group).then(() => refreshItems())
  }
  const refreshItems = () => {
    groupService.getGroups().then((i) => {
      items = i
    })
  }
</script>

<Table
  bind:tablename
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

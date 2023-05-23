<script lang="ts">
  import CreateDriver from '$/components/Forms/Driver/CreateDriver.svelte'
  import UpdateDriver from '$/components/Forms/Driver/UpdateDriver.svelte'
  import Table from '$/components/Table/Table.svelte'
  import { view } from '$/lib/stores/basic_stores'
  import type { Driver, DriverWithCategory } from '$/lib/types/DriverTypes'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { authService, driverService } from '$services'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  let routes: string[] = []
  if (browser) {
    routes = authService.getAuthorizedRoutes()
    if (!routes.includes($page.url.pathname)) {
      $view = routes[0]
      goto($view)
    }
  }

  let items: DriverWithCategory[]
  let showCreate = false
  let showUpdate = false
  let itemToUpdate: DriverWithCategory
  let tablename = 'Drivers'
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
    driverService.deleteDriver(detail.id_driver).then(() => refreshItems())
  }

  const refreshItems = () => {
    driverService.getDriversWithCategories().then((i) => {
      items = i
    })
  }
</script>

<Table
  bind:items
  bind:tablename
  createButtonText="Insert Driver"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>

{#if showCreate}
  <CreateDriver bind:showCreate on:created={refreshItems} />
{/if}
{#if showUpdate}
  <UpdateDriver bind:showUpdate on:updated={refreshItems} bind:itemToUpdate />
{/if}

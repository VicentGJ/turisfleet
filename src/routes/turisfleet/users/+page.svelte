<script lang="ts">
  import ChangePasswordUser from '$/components/Forms/User/ChangePasswordUser.svelte'
  import UpdateUser from '$/components/Forms/User/UpdateUser.svelte'
  import Table from '$/components/Table/Table.svelte'
  import { userService } from '$/lib/services/services'
  import { view } from '$/lib/stores/basic_stores'
  import type { User } from '$/lib/types/UserTypes'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import CreateUser from '$components/Forms/User/CreateUser.svelte'
  import { authService } from '$services'
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

  let items: User[]
  let showCreate = false
  let showUpdate = false
  let showChangePasword = false
  let itemToUpdate: User
  let tablename = 'Users'

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
    userService.deleteUser(detail.id_user).then(() => refreshItems())
  }
  const refreshItems = () => {
    userService.getUsers().then((i) => {
      items = i
    })
  }
</script>

<Table
  bind:tablename
  bind:items
  createButtonText="Insert User"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreate}
  <CreateUser bind:showCreate on:created={refreshItems} />
{/if}

{#if showUpdate}
  <UpdateUser
    bind:showUpdate
    on:updated={refreshItems}
    bind:itemToUpdate
    on:change-password={() => (showChangePasword = true)}
  />
{/if}

{#if showChangePasword}
  <ChangePasswordUser
    bind:showUpdate={showChangePasword}
    bind:itemToUpdate
    on:updated={refreshItems}
  />
{/if}

<script lang="ts">
  import CreateRequest from '$/components/Forms/Request/CreateRequest.svelte'
  import Table from '$/components/Table/Table.svelte'
  import type { Request } from '$/lib/types/RequestTypes'
  import UpdateRequest from '$components/Forms/Request/UpdateRequest.svelte'
  import {
    carService,
    driverService,
    groupService,
    requestService,
  } from '$services'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'
  let items: Request[]
  let showCreate = false
  let showUpdate = false
  let itemToUpdate: Request
  let createButtonDisabled = false
  let createButtonDisabledReason = ''
  let tablename = 'Requests'
  onMount(() => {
    refreshItems()
    let disabled = false
    Promise.all([
      carService.getCars(1).then((c) => {
        if (c.length == 0) {
          createButtonDisabled = true
          createButtonDisabledReason = 'There are no cars in the Cars table'
        }
      }),
      driverService.getDrivers(1).then((d) => {
        if (d.length == 0) {
          createButtonDisabled = true
          createButtonDisabledReason =
            'There are no drivers in the Drivers table'
        }
      }),
      groupService.getGroups(1).then((g) => {
        if (g.length == 0) {
          createButtonDisabled = true
          createButtonDisabledReason = 'There are no groups in the Groups table'
        }
      }),
    ])
  })
  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail
    showUpdate = true
  }
  const handleCreateClicked = () => {
    showCreate = true
  }
  const handleDeleteClicked = ({ detail }: any) => {
    requestService.deleteRequest(detail.id_request).then(() => refreshItems())
  }
  const refreshItems = () => {
    requestService.getRequests().then((i) => {
      items = []
      i.forEach((r) => {
        items = [
          ...items,
          {
            ...r,
            date: dayjs(r.date).format('MMM DD, YYYY'),
            return_date: dayjs(r.date).format('MMM DD, YYYY'),
          },
        ]
      })
    })
  }
</script>

<Table
  bind:tablename
  bind:items
  bind:createButtonDisabled
  bind:createButtonDisabledReason
  createButtonText="Insert Request"
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>
{#if showCreate}
  <CreateRequest bind:showCreate on:created={refreshItems} />
{/if}

{#if showUpdate}
  <UpdateRequest bind:showUpdate on:updated={refreshItems} bind:itemToUpdate />
{/if}

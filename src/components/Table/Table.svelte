<script lang="ts">
  import { view } from '$stores/basic_stores'
  import { createEventDispatcher, onMount } from 'svelte'
  import Button from '../Shared/Button.svelte'
  import DeleteConfirmation from './../Shared/DeleteConfirmation.svelte'
  export let items: any[] = []
  export let createButtonText = ''
  export let createButtonDisabled = false
  export let createButtonDisabledReason = ''
  export let tablename = ''
  let headers: string[] = []
  let idColumn: string = ''
  const dispatch = createEventDispatcher()
  let itemToDelete: any = null
  let showConfirmation = false
  let filters: any = {}
  let filteredItems: any[] = []
  let confirmation = {
    identifier: '',
    item: {},
  }

  onMount(() => {
    filteredItems = items
  })
  $: switch ($view) {
    case 'turisfleet/cars':
      idColumn = 'id_car'
      break
    case 'turisfleet/drivers':
      idColumn = 'id_driver'
      break
    case 'turisfleet/groups':
      idColumn = 'id_group'
      break
    case 'turisfleet/requests':
      idColumn = 'id_request'
      break
    case 'turisfleet/situations':
      idColumn = 'id_situation'
      break
    case 'turisfleet/programs':
      idColumn = 'id_program'
      break
    case 'turisfleet/programs/specific':
      idColumn = 'id_specific_program'
      break
    default:
      idColumn = ''
      break
  }
  $: {
    filteredItems = items
    for (const [filterkey, filtervalue] of Object.entries(filters)) {
      const value = filtervalue as string
      const toCompare = value.trim().toLowerCase()
      if (value.trim()) {
        if (filterkey == '*') {
          filteredItems = filteredItems.filter((i) => compareRow(i, toCompare))
        } else {
          filteredItems = filteredItems.filter((i) =>
            compareRow(i, toCompare, filterkey)
          )
        }
      } else {
        delete filters[filterkey]
      }
    }
  }
  const compareRow = (row: any, value: string, key: string = '') => {
    if (value == '-') {
      if (!key) {
        return Object.values(row).some((v) => v == null)
      } else {
        return row[key] == null
      }
    } else {
      const conditions = [
        (v: string) => typeof v == 'string' && v.toLowerCase().includes(value),
        (v: string | number) =>
          typeof v == 'number' && v.toString().includes(value.toString()),
      ]

      if (!key) {
        return Object.values(row).some((v) =>
          conditions.some((condition) => condition(v as string))
        )
      } else {
        return conditions.some((condition) => condition(row[key]))
      }
    }
  }

  $: if (items && items.length > 0) {
    headers = Object.keys(items[0])
  }
  const rowClicked = (item: any) => {
    dispatch('row-clicked', item)
  }
  const createClicked = () => {
    dispatch('create-clicked')
  }
  const deleteClicked = (item: any) => {
    showConfirmation = true
    itemToDelete = item
  }
  const deleteConfirmed = () => {
    dispatch('delete-clicked', itemToDelete)
    itemToDelete = null
  }
</script>

<div class="table-container">
  <div class="table-header-container">
    <div class="input-container table-filter">
      <input
        type="text"
        bind:value={filters['*']}
        placeholder="table filter"
        disabled={items.length === 0}
      />
    </div>
    <h2 class="table-name-header">{tablename}</h2>
    <Button
      on:click={createClicked}
      bind:text={createButtonText}
      bind:disabled={createButtonDisabled}
      bind:tooltip={createButtonDisabledReason}
    />
  </div>
  <div class="table-wrapper">
    {#if items.length}
      <table class="table">
        <thead>
          <tr class:got-headers={headers.length > 0}>
            {#each headers as header}
              {#if header != idColumn && header != 'disable' && header != 'disabled'}
                {@const h = header.split('_').join(' ')}
                <th>
                  <div class="header-name-filter-wrapper">
                    <p class="header-name">{h}</p>
                    <div class="input-container header-filter">
                      <input
                        type="text"
                        bind:value={filters[header]}
                        placeholder="{h.toLowerCase().split(' ')[0]} filter"
                      />
                    </div>
                  </div>
                </th>
              {/if}
            {/each}
            <th class="actions-header">
              <div class="header-name-filter-wrapper actions">
                <p class="header-name">Actions</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each filteredItems as item}
            <tr on:click={() => rowClicked(item)}>
              {#each Object.entries(item) as [key, value]}
                {#if key != idColumn && key != 'disable' && key != 'disabled'}
                  <td>
                    {value === null ? '-' : value}
                  </td>
                {/if}
              {/each}
              <td class="action-cell">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                  src="/trash.svg"
                  alt=""
                  on:click|capture|preventDefault|stopPropagation={() =>
                    deleteClicked(item)}
                  class="clickable-icon"
                />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

{#if showConfirmation}
  <DeleteConfirmation bind:showConfirmation on:confirm={deleteConfirmed} />
{/if}

<style>
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  .actions-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .table-container {
    position: relative;
  }
  .table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    table-layout: auto;
  }
  .got-headers {
    box-shadow: var(--default-shadow);
  }
  .table-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px 5px 5px 0;
    padding: 5px 15px;
    position: relative;
  }
  th {
    text-transform: capitalize;
    height: 0;
  }
  .action-cell {
    text-align: end;
  }
  .table-wrapper {
    height: calc(
      100vh - 50px - 5px - 5px - 41px - 10px
    ); /*height of: navbar, gaps in containers, height of table header, general margin bottom*/
    width: 100%;
    overflow-y: auto;
  }
  .header-name-filter-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
  }
  .header-name-filter-wrapper.actions {
    align-items: flex-end;
  }
  .header-name {
    width: 100%;
  }
  .header-name:last-child {
    text-align: end;
  }
  td,
  th {
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dcdcdc55;
  }

  thead > tr {
    background: white;
    position: sticky;
    top: 0;
    z-index: 10;
    display: table-row;
  }

  tbody > tr:hover {
    background-color: var(--item-hover-color);
    cursor: pointer;
  }

  .input-container.header-filter > input {
    width: 110px;
  }
  .table-name-header {
    margin: 0;
  }
</style>

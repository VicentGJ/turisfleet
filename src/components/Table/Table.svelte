<script>
  import DeleteConfirmation from "./../Shared/DeleteConfirmation.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import Button from "../Shared/Button.svelte";
  export let items = [];
  export let createButtonText = "";
  export let showIDcolumn = false;
  let headers = [];
  const dispatch = createEventDispatcher();
  let itemToDelete = null;
  let showConfirmation = false;
  let filters = {};
  let filteredItems = [];
  let confirmation = {
    identifier: "",
    item: {},
  };

  onMount(() => {
    filteredItems = items;
  });

  $: {
    filteredItems = items;
    for (const [filterkey, filtervalue] of Object.entries(filters)) {
      const toCompare = filtervalue.trim().toLowerCase();
      if (filtervalue.trim()) {
        if (filterkey == "*") {
          filteredItems = filteredItems.filter((i) => compareRow(i, toCompare));
        } else {
          filteredItems = filteredItems.filter((i) =>
            compareRow(i, toCompare, filterkey)
          );
        }
      } else {
        delete filters[filterkey];
      }
    }
  }
  const compareRow = (row, value, key = undefined) => {
    if (value == "-") {
      if (!key) {
        return Object.values(row).some((v) => v == null);
      } else {
        return row[key] == null;
      }
    } else {
      const conditions = [
        (v) => typeof v == "string" && v.toLowerCase().includes(value),
        (v) => typeof v == "number" && v.toString().includes(value.toString()),
      ];

      if (!key) {
        return Object.values(row).some((v) =>
          conditions.some((condition) => condition(v))
        );
      } else {
        return conditions.some((condition) => condition(row[key]));
      }
    }
  };

  $: if (items && items.length > 0) {
    headers = Object.keys(items[0]);
  }
  const rowClicked = (item) => {
    dispatch("row-clicked", item);
  };
  const createClicked = () => {
    dispatch("create-clicked");
  };
  const deleteClicked = (item) => {
    showConfirmation = true;
    itemToDelete = item;
  };
  const deleteConfirmed = () => {
    dispatch("delete-clicked", itemToDelete);
    itemToDelete = null;
  };
</script>

<div class="table-container">
  <div class="table-header-container">
    <div class="input-container table-filter">
      <input type="text" bind:value={filters["*"]} placeholder="table filter" />
    </div>
    <Button on:click={createClicked} bind:text={createButtonText} />
  </div>
  <div class="table-wrapper">
    {#if items.length}
      <table class:hide-id={!showIDcolumn} class="table">
        <thead>
          <tr class:got-headers={headers.length > 0}>
            {#each headers as header}
              {@const h = header.split("_").join(" ")}
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
            {/each}
            <th>
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
                <td class:small-td={!value || value.length < 5}>
                  {value === null ? "-" : value}
                </td>
              {/each}
              <td class="action-cell">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                  src="trash.svg"
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
  .table-container {
    width: 100%;
    height: 100%;
  }
  .table {
    height: 50px;
    width: 100%;
    text-align: left;
    position: relative;
    border-collapse: collapse;
    table-layout: fixed;
  }
  .got-headers {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  }
  .table-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 5px 5px 0;
    padding: 5px 15px;
  }
  th {
    text-transform: capitalize;
  }
  .action-cell {
    display: flex;
    justify-content: flex-end;
    text-align: right;
  }
  .table-wrapper {
    height: calc(
      100vh - 50px - 5px - 5px - 41px - 10px
    ); /*height of: navbar, gaps in containers, height of table header, general margin bottom*/
    width: calc(100vw - 192px - 10px - 5px);
    overflow-y: auto;
  }

  .table.hide-id th:first-child,
  td:first-child {
    display: none;
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
</style>

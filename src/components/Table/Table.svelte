<script>
  import DeleteConfirmation from "./../Shared/DeleteConfirmation.svelte";
  import { createEventDispatcher } from "svelte";
  import Button from "../Shared/Button.svelte";
  export let items = [];
  export let createButtonText = "";
  let itemToDelete = null;
  let showConfirmation = false;
  let confirmation = {
    identifier: "",
    item: {},
  };
  const dispatch = createEventDispatcher();
  let headers = [];
  $: if (items && items.length > 0) {
    headers = [...Object.keys(items[0]), "Actions"];
  }
  const rowClicked = (item) => {
    dispatch("row-clicked", item);
  };
  const createClicked = () => {
    dispatch("create-clicked");
  };
  const deleteClicked = (item) => {
    console.log("delete-clicked", item);
    showConfirmation = true;
    itemToDelete = item;
  };
  const deleteConfirmed = () => {
    console.log(itemToDelete);
    dispatch("delete-clicked", itemToDelete);
    itemToDelete = null;
  };
</script>

<div class="table-container">
  <div class="insert-button-container">
    <Button on:click={createClicked} bind:text={createButtonText} />
  </div>
  <div class="table-wrapper">
    {#if items.length}
      <table>
        <thead>
          <tr class:got-headers={headers.length > 0}>
            {#each headers as header}
              {@const h = header.split("_").join(" ")}
              <th>
                {h}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each items as item}
            <tr on:click={() => rowClicked(item)}>
              {#each Object.entries(item) as [key, value]}
                <td>{value}</td>
              {/each}
              <td>
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
  /* tbody {
    overflow: scroll;
  } */
  table {
    height: 100px;
    width: 100%;
  }
  table td:last-child {
    text-align: center;
  }
  .got-headers {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  }
  .insert-button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 5px 5px 5px 0;
  }
  th {
    text-transform: capitalize;
  }
  .table-wrapper {
    display: flex;
    height: 92vh;
    width: 100%;
    overflow-y: auto;
  }
</style>

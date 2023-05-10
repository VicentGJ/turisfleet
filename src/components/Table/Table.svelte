<script>
  import { createEventDispatcher } from "svelte";
  export let items = [];
  const dispatch = createEventDispatcher();
  let headers = [];
  $: if (items && items.length > 0) {
    headers = Object.keys(items[0]);
  }
  const rowClicked = (item) => {
    dispatch("row-clicked", item);
  };
</script>

<div class="table-container">
  <table>
    <thead>
      <tr class:got-headers={headers.length > 0}>
        {#each headers as header}
          <th>
            {header}
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
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  table {
    height: 100px;
    width: 100%;
  }
  .got-headers {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  }
</style>

<script>
  import PlaceHolder from "$services/PlaceHolderExample";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  let workers = [];
  let headers = [];
  onMount(() => {
    const ph = PlaceHolder.getInstance();
    ph.getWorkersFromCompany(1, 5).then((ws) => {
      workers = ws;
      Object.entries(workers[0]).forEach(([key, value]) => {
        headers = [...headers, key];
      });
    });
  });
</script>

<!-- test -->
{#if workers.length}
  <table>
    <thead>
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each workers as obrero}
        <tr>
          {#each Object.entries(obrero) as [key, value], index}
            <td in:scale={{ delay: 100 * index, duration: 200 }}>
              {value}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<script lang="ts">
  import { view } from "$stores/basic_stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  onMount(() => {
    goto($view);
  });
</script>

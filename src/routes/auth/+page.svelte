<script>
  import { goto } from "$app/navigation";

  // your script goes here
  import { onMount } from "svelte";
  onMount(() => {
    goto("/auth/login");
  });
</script>

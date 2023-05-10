<script lang="ts">
  import { onMount } from "svelte";
  import { programService } from "$services";
  const durationObjToStr = (duration: object): string => {
    let result = "";
    Object.entries(duration).forEach(([key, value]) => {
      result += `${value} ${key} `;
    });

    return result.trim();
  };
  onMount(async () => {
    
  });
</script>

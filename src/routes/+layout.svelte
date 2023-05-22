<script>
  import ErrorMessage from '$/components/Shared/ErrorMessage.svelte'
  import Loading from '$/components/Shared/Loading.svelte'
  import '$/css/animations.css'
  import '$/css/app.css'
  import '$/css/variables.css'
  import { errorMessage, loading } from '$stores/basic_stores'
</script>

<slot />
{#if $loading}
  <Loading />
{/if}
{#if $errorMessage.message}
  <ErrorMessage />
{/if}

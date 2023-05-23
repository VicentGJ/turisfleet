<script>
  import Popup from '$/components/Shared/Popup.svelte'
  import { authService } from '$/lib/services/services'
  import Loading from '$/components/Shared/Loading.svelte'
  import '$/css/animations.css'
  import '$/css/app.css'
  import '$/css/variables.css'
  import { browser } from '$app/environment'
  import { popup, loading } from '$stores/basic_stores'
  import { loggedUser, view } from '$stores/basic_stores'
  import { goto } from '$app/navigation'
  $: {
    if (browser) {
      if ($loggedUser.username) {
        const routes = authService.getAuthorizedRoutes()
        if (routes.length === 0) $view = '/auth/login'
        // else $view = routes[0]
      } else $view = '/auth/login'

      goto($view)
    }
  }
</script>

<slot />
{#if $loading}
  <Loading />
{/if}
{#if $popup.message}
  <Popup />
{/if}

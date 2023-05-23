<script lang="ts">
  import { loggedUser } from '$/lib/stores/basic_stores'
  import { view } from '$stores/basic_stores'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { authService } from '$/lib/services/services'
  onMount(() => {
    if ($loggedUser.username) {
      const routes = authService.getAuthorizedRoutes()
      if (routes.length === 0) $view = '/auth/login'
      else $view = routes[0]
    } else $view = '/auth/login'

    goto($view)
  })
</script>

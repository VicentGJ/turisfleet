<script lang="ts">
  import ChangePasswordUser from '$/components/Forms/User/ChangePasswordUser.svelte'
  import Button from '$/components/Shared/Button.svelte'
  import { loggedUser, view } from '$/lib/stores/basic_stores'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'
  import { authService } from '$services'
  let showChangePassword = false
let routes:string[]=[] 
 if (browser) {
    routes = authService.getAuthorizedRoutes()
    if (!routes.includes($view)) {
      $view = routes[0]
      goto($view)
    }
  }

  const refresh = () => {}
  // your script goes here
</script>

<div class="wrapper">
  <div class="content">
    <img src="/profile-96.png" alt="" height="100" />
    <div class="content-wrapper">
      <div class="data-container">
        <h3>Username</h3>
        <p>{$loggedUser.username}</p>
      </div>
      <div class="data-container">
        <h3>Role</h3>
        <p>{$loggedUser.role_name}</p>
      </div>
      <Button
        text="Change Password"
        on:click={() => {
          showChangePassword = true
        }}
      />
    </div>
  </div>
</div>
{#if showChangePassword}
  <ChangePasswordUser
    on:updated={refresh}
    bind:showUpdate={showChangePassword}
    itemToUpdate={$loggedUser}
  />
{/if}

<style>
  h3,
  p {
    margin: 0;
  }

  .data-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 30px;
  }
  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 50px;
  }
</style>

<script lang="ts">
  import { loggedUser, view } from '$/lib/stores/basic_stores'
  import { goto } from '$app/navigation'

  import ReportDropdown from './ReportDropdown.svelte'
  const logout = () => {
    $loggedUser = {
      id_user: -1,
      role_name: '',
      username: '',
    }
    $view = '/auth/login'
    goto($view)
  }
</script>

<div id="navbar-container">
  <div class="wrapper">
    <div class="app-name-container noselect">
      <h2>TurisFleet</h2>
    </div>
    <div class="nav-main-elements-wrapper">
      <ReportDropdown />
    </div>
  </div>
  <div class="wrapper">
    <div class="logout-wrapper">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img src="/logout.png" alt="logout" on:click={logout} />
    </div>
  </div>
</div>

<style>
  #navbar-container {
    height: 50px;
    width: 99%;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .app-name-container {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }
  .nav-main-elements-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    width: fit-content;
    gap: 10px;
    height: 100%;
  }

  h2 {
    margin: 0;
  }
  .logout-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
  }
  .logout-wrapper > img {
    height: 30px;
    object-fit: fill;
    cursor: pointer;
    transition: all;
    transition-duration: 150ms;
  }
  .logout-wrapper > img:hover {
    transform: scale(110%);
  }
  .logout-wrapper > img:active {
    transform: scale(90%);
  }
</style>

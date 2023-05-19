<script>
  // your script goes here

  import ReportDropdown from "./ReportDropdown.svelte";
</script>

<div id="navbar-container">
  <div class="app-name-container noselect">
    <h2>TurisFleet</h2>
  </div>
  <div class="nav-main-elements-wrapper">
    <ReportDropdown />
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
  }
  .app-name-container {
    margin-left: 15px;
  }
  .nav-main-elements-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 20px;
  }
</style>

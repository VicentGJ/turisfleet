<script>
  import { view } from '$/lib/stores/basic_stores'
  import Navbar from '$/components/Layout/Navbar/Navbar.svelte'
  import Panel from '$/components/Layout/Panel/Panel.svelte'
  import ErrorMessage from '$/components/Shared/ErrorMessage.svelte'
  import Loading from '$/components/Shared/Loading.svelte'
  import '$/css/animations.css'
  import '$/css/app.css'
  import '$/css/variables.css'
  import { errorMessage, loading } from '$stores/basic_stores'
</script>

<div id="main-layout-container">
  <div id="nav-wrapper">
    <Navbar />
  </div>
  <div id="main-content-container">
    <div id="panel-container">
      <Panel />
    </div>
    <div id="slot-container">
      <slot />
    </div>
  </div>
  {#if $loading}
    <Loading />
  {/if}
  {#if $errorMessage.message}
    <ErrorMessage />
  {/if}
</div>

<style>
  #main-layout-container {
    background-color: rgba(213, 213, 213, 0.297);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  #main-content-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 6px;
    height: calc(100vh - 50px - 5px - 5px);
    margin-top: 5px;
    position: relative;
  }

  #slot-container {
    position: relative;
    width: calc(100vw - 237px);
    height: 100%;
    background-color: white;
    border-radius: 8px;
    margin-right: 5px;
  }
  #nav-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
</style>

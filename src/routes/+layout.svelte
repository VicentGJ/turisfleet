<script>
  import Loading from "$/components/Shared/Loading.svelte";
  import Navbar from "$/components/layout/Navbar.svelte";
  import "$/css/animations.css";
  import "$/css/app.css";
  import "$/css/variables.css";
  import Panel from "$components/layout/Panel/Panel.svelte";
  import { loading } from "./../lib/stores/basic_stores.ts";
</script>

<div id="main-layout-container">
  <div id="nav-wrapper">
    <Navbar />
  </div>
  <div id="main-content-container">
    <Panel />
    <div id="slot-container">
      <slot />
    </div>
  </div>
  {#if $loading}
    <Loading />
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
    width: 100%;
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

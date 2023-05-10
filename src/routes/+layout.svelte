<script>
  import "$/css/app.css";
  import "$/css/variables.css";
  import "$/css/animations.css";
  import Panel from "$components/layout/Panel/Panel.svelte";
  import Navbar from "$/components/layout/Navbar.svelte";
  import { goto } from "$app/navigation";
  import { view } from "$/lib/stores/basic_stores";
  import { browser } from "$app/environment";
  $: $view && browser && goto($view);
</script>

<div id="main-layout-container">
  <div id="nav-container">
    <Navbar />
  </div>
  <div id="main-content-container">
    <Panel />
    <div id="slot-container">
      <slot />
    </div>
  </div>
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
    gap: 10px;
    height: 100%;
  }
  #slot-container {
    background-color: white;
    border-radius: 8px;
    margin: 4px 10px 4px 0;
    width: 100%;
    /* overflow-y: scroll; */
  }
</style>

<script>
  import Loading from "$/components/Shared/Loading.svelte";
  import Navbar from "$/components/layout/Navbar.svelte";
  import "$/css/animations.css";
  import "$/css/app.css";
  import "$/css/variables.css";
  import {
    view,
    situationView,
    programView,
    idColumn,
  } from "$/lib/stores/basic_stores";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import Panel from "$components/layout/Panel/Panel.svelte";
  import { loading } from "./../lib/stores/basic_stores.ts";
  $: browser && $view && goto($view);

  $: if ($view || $situationView || $programView) {
    switch ($view) {
      case "cars":
        $idColumn = "id_car";
        break;
      case "drivers":
        $idColumn = "id_driver";
        break;
      case "groups":
        $idColumn = "id_group";
        break;
      case "requests":
        $idColumn = "id_request";
        break;
      case "situations":
        $idColumn = $situationView == "situations" ? "id_situation" : undefined;
        break;
      case "programs":
        $idColumn =
          $programView == "programs" ? "id_program" : "id_specific_program";
        break;
      default:
        $idColumn = undefined;
        break;
    }
  }
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
    height: 100%;
    margin-top: 5px;
  }
  #slot-container {
    background-color: white;
    border-radius: 8px;
    margin-right: 5px;
    width: 100%;
  }
  #nav-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
</style>

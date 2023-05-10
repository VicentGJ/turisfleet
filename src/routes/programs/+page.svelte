<script lang="ts">
  import { durationObjToStr } from "$lib/utils";
  import Tabs from "$/components/Shared/Tabs.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { programView } from "$/lib/stores/basic_stores";
  import { browser } from "$app/environment";
  import Loading from "$components/Shared/Loading.svelte";
  import { programService } from "$services";
  let requestCompleted = false;
  let items: [] = [];
  $: tabs = [
    {
      name: "Specific Programs",
      id: "specific-programs",
      active: $programView === "specific-programs",
    },
    {
      name: "Programs",
      id: "programs",
      active: $programView === "programs",
    },
  ];

  $: if (browser && $programView) {
    items = [];
    requestCompleted = false;
    switch ($programView) {
      case "specific-programs":
        programService.getSpecificPrograms().then((i) => {
          requestCompleted = true;
          i.map((i: any) => {
            i["duration"] = durationObjToStr(i.duration);
            return i;
          });
          items = i;
        });
        break;
      case "programs":
        programService.getPrograms().then((i) => {
          requestCompleted = true;
          items = i;
        });
        break;
    }
  }

  const handleRowClick = ({ detail }: any) => {};

  const changeView = ({ detail }: any) => {
    const index = detail;
    const temp = tabs;
    tabs = [];
    temp.forEach((tab, i) => {
      const t = tab;
      t.active = i === index;
      if (t.active) {
        $programView = t.id;
      }
      tabs = [...tabs, t];
    });
  };
</script>

<Tabs bind:tabs on:change-tab={changeView} />
{#if items.length || requestCompleted}
  <Table bind:items on:row-clicked={handleRowClick} />
{:else}
  <div class="loading-container">
    <Loading />
  </div>
{/if}

<style>
  .loading-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>

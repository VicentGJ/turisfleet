<script lang="ts">
  import CreateProgram from "$/components/Forms/Program/CreateProgram.svelte";
  import CreateSpecificProgram from "$/components/Forms/Program/CreateSpecificProgram.svelte";
  import UpdateProgram from "$/components/Forms/Program/UpdateProgram.svelte";
  import Tabs from "$/components/Shared/Tabs.svelte";
  import Table from "$/components/Table/Table.svelte";
  import { loading, programView } from "$/lib/stores/basic_stores";
  import type { Program, SpecificProgram } from "$/lib/types/ProgramTypes";
  import { browser } from "$app/environment";
  import { durationObjToStr } from "$lib/utils";
  import { programService } from "$services";
  import UpdateSpecificProgram from "./../../components/Forms/Program/UpdateSpecificProgram.svelte";
  let showCreateProgram = false;
  let showCreateSpecificProgram = false;

  let showUpdateProgram = false;
  let showUpdateSpecificProgram = false;

  let itemToUpdate: Program | SpecificProgram;
  let items: Array<Program | SpecificProgram>;
  let createButtonText = "";

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
   
    refreshItems();
    switch ($programView) {
      case "specific-programs":
        createButtonText = "Insert Specific Program";
        break;
      case "programs":
        createButtonText = "Insert Program";
        break;
    }
  }

  const handleRowClick = ({ detail }: any) => {
    itemToUpdate = detail;
    switch ($programView) {
      case "programs":
        showUpdateProgram = true;
        break;
      case "specific-programs":
        showUpdateSpecificProgram = true;
        break;
    }
  };
  const handleCreateClicked = () => {
    switch ($programView) {
      case "programs":
        showCreateProgram = true;
        break;
      case "specific-programs":
        showCreateSpecificProgram = true;
        break;
    }
  };
  const handleDeleteClicked = ({ detail }: any) => {
   
    switch ($programView) {
      case "specific-programs":
        programService
          .deleteSpecificProgram(detail.id_specific_program)
          .then(() => refreshItems());
        break;
      case "programs":
        programService
          .deleteProgram(detail.id_program)
          .then(() => refreshItems());
        break;
    }
  };
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

  const refreshItems = () => {
   
    switch ($programView) {
      case "programs":
        programService.getPrograms().then((i) => {
          
          items = i;
        });
        break;
      case "specific-programs":
        programService.getSpecificPrograms().then((i) => {
          
          i.map((i: any) => {
            i["duration"] = durationObjToStr(i.duration);
            return i;
          });
          items = i;
        });
        break;
    }
  };
</script>

<Tabs bind:tabs on:change-tab={changeView} />
<Table
  bind:items
  bind:createButtonText
  on:row-clicked={handleRowClick}
  on:create-clicked={handleCreateClicked}
  on:delete-clicked={handleDeleteClicked}
/>

{#if showCreateProgram}
  <CreateProgram
    bind:showCreate={showCreateProgram}
    on:created={refreshItems}
  />
{/if}
{#if showCreateSpecificProgram}
  <CreateSpecificProgram
    bind:showCreate={showCreateSpecificProgram}
    on:created={refreshItems}
  />
{/if}
{#if showUpdateProgram}
  <UpdateProgram
    bind:showUpdate={showUpdateProgram}
    on:updated={refreshItems}
    bind:itemToUpdate
  />
{/if}
{#if showUpdateSpecificProgram}
  <UpdateSpecificProgram
    bind:showUpdate={showUpdateSpecificProgram}
    on:updated={refreshItems}
    bind:itemToUpdate
  />
{/if}

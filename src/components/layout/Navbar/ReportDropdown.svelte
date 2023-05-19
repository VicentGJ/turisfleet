<script lang="ts">
  import DropdownItem from "$components/Shared/DropdownItem.svelte";
  import Dropdown from "$components/Shared/Dropdown.svelte";
  import DropdownToggler from "$components/Shared/DropdownToggler.svelte";
  import type { ReportType } from "$lib/types/ReportTypes";
  let open = false;

  const reportList: ReportType[] = [
    { id: "report-1", name: "Drivers List", click: report1 },
    { id: "report-2", name: "Cars List", click: report2 },
    { id: "report-3", name: "Request on date", click: report3 },
    { id: "report-4", name: "Car situations", click: report4 },
    { id: "report-5", name: "Driver situations", click: report5 },
    { id: "report-6", name: "Car-Driver relation list", click: report6 },
    { id: "report-7", name: "Drags list", click: report7 },
    { id: "report-8", name: "Routing Sheets", click: report8 },
    { id: "report-9", name: "Request modifications", click: report9 },
  ];
  function report1(this: ReportType) {
    console.log(this.id);
  }
  function report2(this: ReportType) {
    console.log(this.id);
  }
  function report3(this: ReportType) {
    console.log(this.id);
  }
  function report4(this: ReportType) {
    console.log(this.id);
  }
  function report5(this: ReportType) {
    console.log(this.id);
  }
  function report6(this: ReportType) {
    console.log(this.id);
  }
  function report7(this: ReportType) {
    console.log(this.id);
  }
  function report8(this: ReportType) {
    console.log(this.id);
  }
  function report9(this: ReportType) {
    console.log(this.id);
  }
</script>

<div class="report-dropdown-container">
  <DropdownToggler bind:open>Reports</DropdownToggler>
  {#if open}
    <Dropdown>
      {#each reportList as { name, id, click }}
        <DropdownItem {id} on:click={click}>{name}</DropdownItem>
      {/each}
    </Dropdown>
  {/if}
</div>

<style>
  .report-dropdown-container {
    flex: none;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>

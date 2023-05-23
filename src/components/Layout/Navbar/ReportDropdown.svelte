<script lang="ts">
  import SelectRequestModal from '$components/Shared/SelectRequestModal.svelte'
  import { popup } from '$stores/basic_stores'
  import { loggedUser } from '$/lib/stores/basic_stores'
  import { reportService } from '$/lib/services/services'
  import { generatePDF } from '$/lib/utils'
  import Dropdown from '$components/Shared/Dropdown.svelte'
  import DropdownItem from '$components/Shared/DropdownItem.svelte'
  import DropdownToggler from '$components/Shared/DropdownToggler.svelte'
  import type { ReportItemType } from '$lib/types/ReportTypes'
  import DatePickerModal from '$/components/Shared/DatePickerModal.svelte'
  import dayjs from 'dayjs'
  import { onMount } from 'svelte'
  let open = false
  const reportList: ReportItemType[] = [
    {
      id: 'report-1',
      name: 'Drivers List',
      click: report1,
      show:
        $loggedUser.role_name === 'administrator' ||
        $loggedUser.role_name === 'agent',
    },
    {
      id: 'report-2',
      name: 'Cars List',
      click: report2,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
    {
      id: 'report-3',
      name: 'Request on date',
      click: report3,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
    {
      id: 'report-4',
      name: 'Car situations',
      click: report4,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
    {
      id: 'report-5',
      name: 'Driver situations',
      click: report5,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
    {
      id: 'report-6',
      name: 'Car-Driver relation list',
      click: report6,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
    {
      id: 'report-7',
      name: 'Drags list',
      click: report7,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
    {
      id: 'report-8',
      name: 'Routing Sheets',
      click: report8,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent' ||
        $loggedUser.role_name === 'driver',
    },
    {
      id: 'report-9',
      name: 'Request modifications',
      click: report9,
      show:
        $loggedUser.role_name == 'administrator' ||
        $loggedUser.role_name == 'agent',
    },
  ]
  async function report1(this: ReportItemType) {
    let drivers = await reportService.report1()
    if (drivers.length > 0) {
      generatePDF(
        drivers,
        `[Report #1][${dayjs().format('YYYY-MMM-DD')}] All Drivers`,
        false,
        true
      )
    } else {
      $popup = {
        message: 'No data in report',
        type: 'info',
      }
    }
  }
  async function report2(this: ReportItemType) {
    let cars = await reportService.report2()
    if (cars.length > 0) {
      generatePDF(
        cars,
        `[Report #2][${dayjs().format('YYYY-MMM-DD')}] All Cars`,
        false,
        true
      )
    } else {
      $popup = {
        message: 'No data in report',
        type: 'info',
      }
    }
  }

  let showDatemodal = false
  let report3date: Date | undefined = undefined
  async function report3(this: ReportItemType) {
    if (!report3date) showDatemodal = true
    else {
      showDatemodal = false
      let requests = await reportService.report3(report3date)
      if (requests.length > 0) {
        generatePDF(
          requests,
          `[Report #3][${dayjs().format(
            'YYYY-MMM-DD'
          )}] Requests on date: ${dayjs(report3date).format('MMM DD, YYYY')}`,
          false,
          true
        )
      } else {
        $popup = {
          message: 'No data in report',
          type: 'info',
        }
      }
      report3date = undefined
    }
  }

  async function report4(this: ReportItemType) {
    const cs = await reportService.report4()
    if (cs.length > 0) {
      generatePDF(
        cs,
        `[Report #4][${dayjs().format('YYYY-MMM-DD')}] Car Situations`,
        false,
        true
      )
    } else {
      $popup = {
        message: 'No data in report',
        type: 'info',
      }
    }
  }
  async function report5(this: ReportItemType) {
    const ds = await reportService.report5()
    if (ds.length > 0) {
      generatePDF(
        ds,
        `[Report #5][${dayjs().format('YYYY-MMM-DD')}] Driver Situations`,
        false,
        true
      )
    } else {
      $popup = {
        message: 'No data in report',
        type: 'info',
      }
    }
  }
  async function report6(this: ReportItemType) {
    const cd = await reportService.report6()
    if (cd.length > 0) {
      generatePDF(
        cd,
        `[Report #6][${dayjs().format('YYYY-MMM-DD')}] Car-Driver relation`,
        false,
        true
      )
    } else {
      $popup = {
        message: 'No data in report',
        type: 'info',
      }
    }
  }

  async function report7(this: ReportItemType) {
    let res = await reportService.report7(24)
    if (res.length > 0) {
      generatePDF(
        res,
        `[Report #7][${dayjs().format('YYYY-MMM-DD')}] Drags list`
      )
    } else {
      $popup = {
        message: 'No data in report',
        type: 'info',
      }
    }
  }
  async function report8(this: ReportItemType) {
    if ($loggedUser.role_name === 'driver') {
    } else {
    }
  }
  let showSelectRequest = false
  let requestselected: number | undefined = undefined
  async function report9(this: ReportItemType) {
    console.log(requestselected)
    if (requestselected === undefined) {
      showSelectRequest = true
    } else {
      const res = await reportService.report9()
      if (res.length > 0) {
        generatePDF(
          res,
          `[Report #9][${dayjs().format('YYYY-MMM-DD')}] Modifications`
        )
      } else {
        $popup = {
          message: 'No data in report',
          type: 'info',
        }
      }
      showSelectRequest = false
      requestselected = undefined
    }
  }

  let container: HTMLDivElement
  const toggle = (ev: MouseEvent): void => {
    if (outside(ev) && open) open = false
  }

  const outside = (ev: MouseEvent): boolean => {
    const target = ev.target as HTMLElement
    if (container) return !container.contains(target)
    return false
  }
  onMount(() => {
    document.addEventListener('click', toggle)
  })
</script>

<div class="report-dropdown-container" bind:this={container}>
  <DropdownToggler bind:open>Reports</DropdownToggler>
  {#if open}
    <Dropdown>
      {#each reportList as { name, id, click, show }}
        {#if show}
          <DropdownItem {id} on:click={click} bind:open>{name}</DropdownItem>
        {/if}
      {/each}
    </Dropdown>
  {/if}
</div>

{#if showDatemodal}
  <DatePickerModal
    required={true}
    bind:value={report3date}
    on:close={() => {
      showDatemodal = false
    }}
    on:selected={report3}
  />
{/if}

{#if showSelectRequest}
  <SelectRequestModal
    bind:selected={requestselected}
    on:close={() => {
      showSelectRequest = false
      // requestselected = undefined
    }}
    on:selected={report9}
  />
{/if}

<style>
  .report-dropdown-container {
    flex: none;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>

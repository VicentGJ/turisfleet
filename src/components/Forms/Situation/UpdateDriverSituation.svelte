<script lang="ts">
  import type { Driver } from '$/lib/types/DriverTypes'
  import type { Situation } from '$/lib/types/SituationTypes'
  import { carService, driverService, situationService } from '$services'
  import dayjs from 'dayjs'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  export let showUpdate = false
  export let itemToUpdate: any
  let situations: Situation[] = []
  let drivers: Driver[] = []
  onMount(async () => {
    await Promise.all([
      situationService.getSituations('ALL', 'D').then((s) => {
        situations = [...s, ...situations]
      }),
      situationService.getSituations('ALL', 'CD').then((s) => {
        situations = [...s, ...situations]
      }),
      driverService.getDrivers().then((d) => {
        drivers = d
      }),
    ])
  })
  const dispatch = createEventDispatcher()
  let values = {
    driver_id_driver: itemToUpdate.driver_id_driver,
    situation_id_situation: itemToUpdate.situation_id_situation,
    date: itemToUpdate.date,
    return_date: itemToUpdate.return_date,
  }

  const cancel = () => {
    showUpdate = false
    itemToUpdate = undefined
  }
  const update = async () => {
    await situationService.updateDriverSituation(
      {
        driver_id_driver: itemToUpdate.driver_id_driver,
        date: itemToUpdate.date,
      },
      {
        ...values,
        return_date: values.return_date ? values.return_date : null,
      }
    )

    dispatch('updated')
    itemToUpdate = undefined
    showUpdate = false
  }
  const close = () => {
    cancel()
  }
  $: r = situations.some(
    (s) =>
      (s.situation_name == 'vacations' ||
        s.situation_name == 'inside the country') &&
      s.id_situation == values.situation_id_situation
  )
</script>

<BaseForm
  title="Update Driver Situation"
  primaryBtnTxt="Update Driver Situation"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Driver Situation *</label>
      <select name="" id="" bind:value={values.situation_id_situation}>
        {#if situations}
          {#each situations as situation}
            <option
              value={situation.id_situation}
              selected={situation.id_situation == values.situation_id_situation}
            >
              {situation.situation_name}
            </option>
          {/each}
        {/if}
      </select>
    </div>
    <div class="input-container">
      <label for="">Driver *</label>
      <select name="" id="" bind:value={values.driver_id_driver}>
        {#if drivers}
          {#each drivers as driver}
            <option
              value={driver.id_driver}
              selected={driver.id_driver == values.driver_id_driver}
            >
              {driver.name}
            </option>
          {/each}
        {/if}
      </select>
    </div>
    <div class="input-container">
      <label for="">Date *</label>
      <input
        type="date"
        bind:value={values.date}
        required
        placeholder="date"
        min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
        max={values.return_date
          ? dayjs(values.return_date).format('YYYY-MM-DD')
          : undefined}
      />
    </div>
    <div class="input-container">
      <label for="">Return date {r ? '*' : ''}</label>
      <input
        required={r}
        type="date"
        bind:value={values.return_date}
        placeholder="return date"
        min={values.date
          ? dayjs(values.date).format('YYYY-MM-DD')
          : dayjs().add(1, 'day').format('YYYY-MM-DD')}
      />
    </div>
  </div>
</BaseForm>

<style>
  .form-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 16px;
    justify-content: center;
    align-items: center;
  }
  input,
  select {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

<script lang="ts">
  import type { Car } from '$/lib/types/CarTypes'
  import type { Situation } from '$/lib/types/SituationTypes'
  import { carService, situationService } from '$services'
  import dayjs from 'dayjs'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  export let showUpdate = false
  export let itemToUpdate: any
  let situations: Situation[] = []
  let cars: Car[] = []
  onMount(async () => {
    await Promise.all([
      situationService.getSituations('ALL', 'C').then((s) => {
        situations = [...s, ...situations]
      }),
      situationService.getSituations('ALL', 'CD').then((s) => {
        situations = [...s, ...situations]
      }),
      carService.getCars().then((c) => {
        cars = c
      }),
    ])
  })
  const dispatch = createEventDispatcher()
  let values = {
    car_id_car: itemToUpdate.car_id_car,
    situation_id_situation: itemToUpdate.situation_id_situation,
    date: itemToUpdate.date,
    return_date: itemToUpdate.return_date,
  }

  const cancel = () => {
    showUpdate = false
    itemToUpdate = undefined
  }
  const update = async () => {
    await situationService.updateCarSituation(
      { car_id_car: itemToUpdate.car_id_car, date: itemToUpdate.date },
      values
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
      s.situation_name == 'inside the country' &&
      s.id_situation == values.situation_id_situation
  )
</script>

<BaseForm
  title="Update Car Situation"
  primaryBtnTxt="Update Car Situation"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Car Situation *</label>
      <select name="" id="" bind:value={values.situation_id_situation}>
        {#each situations as situation}
          <option value={situation.id_situation}>
            {situation.situation_name}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Car *</label>
      <select name="" id="" bind:value={values.car_id_car}>
        {#each cars as car}
          <option value={car.id_car}>[{car.plate_number}] {car.brand}</option>
        {/each}
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
  input {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

<script lang="ts">
  import { carService, situationService } from '$/lib/services/services'
  import type { Situation } from '$/lib/types/SituationTypes'
  import dayjs from 'dayjs'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  export let showCreate = false
  let situations: any = []
  let cars: any = []
  const dispatch = createEventDispatcher()
  let values = {
    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    car_id_car: -1,
    situation_id_situation: -1,
    return_date: null,
  }
  onMount(async () => {
    await Promise.all([
      situationService.getSituations(200, 'C').then((s) => {
        situations = [...s, ...situations]
        values.situation_id_situation = situations[0].id_situation
      }),
      situationService.getSituations(200, 'CD').then((s) => {
        situations = [...s, ...situations]
        values.situation_id_situation = situations[0].id_situation
      }),
      carService.getCars().then((c) => {
        cars = c
        values.car_id_car = cars[0].id_car
      }),
    ])
  })

  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    await situationService.createCarSituation(values)

    dispatch('created')
    showCreate = false
  }
  const close = () => {
    showCreate = false
  }
  $: req = situations.some(
    (s: Situation) =>
      (s.situation_name == 'inside the country' ||
        s.situation_name == 'vacations') &&
      s.id_situation === values.situation_id_situation
  )
</script>

<BaseForm
  title="Insert Car Situation"
  primaryBtnTxt="Insert Car Situation"
  on:close-clicked={close}
  on:primary-clicked={create}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Driver *</label>
      <select name="" id="" bind:value={values.car_id_car}>
        {#each cars as car}
          <option value={car.id_car}> [{car.plate_number}] {car.brand}</option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Situation *</label>
      <select name="" id="" bind:value={values.situation_id_situation}>
        {#each situations as situation}
          <option value={situation.id_situation}>
            {situation.situation_name}
          </option>
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
      <label for="">Return date {req ? '*' : ''}</label>
      <input
        required={req}
        type="date"
        bind:value={values.return_date}
        placeholder="date"
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

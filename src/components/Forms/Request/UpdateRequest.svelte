<script lang="ts">
  import type { Car } from '$/lib/types/CarTypes'
  import type { Driver, DriverWithCategory } from '$/lib/types/DriverTypes'
  import type { SpecificProgram } from '$/lib/types/ProgramTypes'
  import type { Request } from '$/lib/types/RequestTypes'
  import {
    carService,
    driverService,
    programService,
    requestService,
  } from '$services'
  import dayjs from 'dayjs'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  export let showUpdate = false
  export let itemToUpdate: Request
  let driver: Driver
  let drivers: DriverWithCategory[] = []
  let programs: SpecificProgram[] = []
  let cars: Car[] = []
  let copilots: DriverWithCategory[] = []
  $: if (driver)
    copilots = [
      {
        address: '',
        categories: [],
        id_driver: -1,
        id_number: '',
        name: 'None',
      },
      ...drivers.filter((d) => d.id_driver !== driver.id_driver),
    ]
  onMount(async () => {
    await Promise.all([
      carService.getCars().then((c) => (cars = c)),
      carService.getCarDriver(itemToUpdate.id_car).then((d) => (driver = d)),
      driverService.getDriversWithCategories().then((d) => (drivers = d)),
      programService.getSpecificPrograms().then((p) => (programs = p)),
    ])
  })
  const dispatch = createEventDispatcher()
  let values = {
    id_car: itemToUpdate.id_car,
    id_copilot: itemToUpdate.id_copilot || -1,
    date: itemToUpdate.date,
    id_specific_program: itemToUpdate.id_specific_program,
    tourist_amount: itemToUpdate.tourist_amount,
  }

  const cancel = () => {
    showUpdate = false
  }
  const update = async () => {
    await requestService.updateRequest(itemToUpdate.id_request, {
      ...values,
    })

    dispatch('updated')
    showUpdate = false
  }
  const close = () => {
    cancel()
  }
</script>

<BaseForm
  title="Update Request"
  primaryBtnTxt="Update Request"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Copilot</label>
      <select name="" id="" bind:value={values.id_copilot}>
        {#each copilots as copilot}
          <option
            value={copilot.id_driver}
            selected={copilot.id_driver == values.id_copilot}
          >
            {copilot.name}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Car *</label>
      <select name="" id="" bind:value={values.id_car} required>
        {#each cars as car}
          <option value={car.id_car} selected={car.id_car == values.id_car}>
            [{car.plate_number}]
            {car.brand}
            {#await carService.getCarDriver(car.id_car) then driver}
              ({driver.name})
            {/await}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Date *</label>
      <input
        type="date"
        name=""
        id=""
        min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
      />
    </div>
    <div class="input-container">
      <label for="">Tourist amount *</label>
      <input
        required
        type="number"
        min="1"
        max="50"
        id=""
        bind:value={values.tourist_amount}
      />
    </div>
    <div class="input-container">
      <label for="">Specific Program *</label>
      <select name="" id="" bind:value={values.id_specific_program} required>
        {#each programs as program}
          <option
            value={program.id_specific_program}
            selected={program.id_specific_program ===
              values.id_specific_program}
          >
            ({program.start}){program.description}
          </option>
        {/each}
      </select>
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
  select {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

<script lang="ts">
  import type { CarCreate } from '$lib/types/CarTypes'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  import { carService, driverService } from '$services'
  import { LicenseCategory } from '$/lib/types/CategoryTypes'
  import type { Driver, DriverWithCategory } from '$/lib/types/DriverTypes'
  export let showCreate = false
  let drivers: DriverWithCategory[] = []
  let filteredDrivers: DriverWithCategory[] = []
  onMount(async () => {
    drivers = await driverService.getDriversWithCategories()
    filteredDrivers = drivers.filter((d) =>
      d.categories.includes(values.id_category)
    )
  })
  const dispatch = createEventDispatcher()
  let values: CarCreate = {
    plate_number: '',
    brand: '',
    seat_amount: 1,
    available_km: 0,
    id_driver: -1,
    id_category: LicenseCategory.A,
  }
  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    await carService.createCar(values)

    dispatch('created')
    showCreate = false
  }
  const close = () => {
    showCreate = false
  }

  $: if (values.id_category) {
    filteredDrivers = drivers.filter((d) =>
      d.categories.includes(values.id_category)
    )

    if (filteredDrivers.length === 0) values.id_driver = -1
    else if (values.id_driver === -1)
      values.id_driver = filteredDrivers[0].id_driver
  }
</script>

<BaseForm
  title="Insert Car"
  primaryBtnTxt="Insert Car"
  on:close-clicked={close}
  on:primary-clicked={create}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Plate Number *</label>
      <input
        required
        type="text"
        bind:value={values.plate_number}
        placeholder="plate number"
      />
    </div>
    <div class="input-container">
      <label for="">Brand *</label>
      <input
        required
        type="text"
        bind:value={values.brand}
        placeholder="brand"
      />
    </div>
    <div class="input-container">
      <label for="">Category *</label>
      <select name="" id="" bind:value={values.id_category}>
        {#each Object.values(LicenseCategory) as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Seat amount *</label>
      <input
        required
        type="number"
        min="1"
        max="100"
        bind:value={values.seat_amount}
        placeholder="seat amount"
      />
    </div>
    <div class="input-container">
      <label for="">Available KM *</label>
      <input
        required
        type="number"
        min="0"
        max="10000"
        bind:value={values.available_km}
        placeholder="available km"
      />
    </div>
    <div class="input-container">
      <label for="">Driver *</label>
      <select name="" id="" bind:value={values.id_driver} required>
        {#each filteredDrivers as option, index}
          <option
            value={option.id_driver}
            selected={option.id_driver === values.id_driver}
          >
            [{Object.values(option.categories)}] {option.name}
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
  input {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

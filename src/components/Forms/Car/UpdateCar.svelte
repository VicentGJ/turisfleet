<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  import { carService, driverService } from '$services'
  import type { DriverWithCategory } from '$/lib/types/DriverTypes'
  export let showUpdate = false
  export let itemToUpdate: any
  let drivers: DriverWithCategory[] = []
  let filteredDrivers: DriverWithCategory[] = []
  onMount(async () => {
    drivers = await driverService.getDriversWithCategories()
    filteredDrivers = drivers.filter((d) =>
      d.categories.includes(itemToUpdate.category)
    )
  })
  const dispatch = createEventDispatcher()
  let values = {
    // available_km: Number(itemToUpdate.available_km),
    // plate_number: itemToUpdate.plate_number,
    // seat_amount: itemToUpdate.seat_amount,
    id_driver: itemToUpdate.id_driver,
  }

  const cancel = () => {
    showUpdate = false
    itemToUpdate = undefined
  }
  const update = async () => {
    await carService.updateCar(itemToUpdate.id_car, values)

    dispatch('updated')
    itemToUpdate = undefined
    showUpdate = false
  }
  const close = () => {
    cancel()
  }
</script>

<BaseForm
  title="Update Car"
  primaryBtnTxt="Update Car"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <!-- <div class="input-container">
      <label for="">Plate Number *</label>
      <input
        required
        type="text"
        bind:value={values.plate_number}
        placeholder="plate number"
      />
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
    </div> -->
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
  /* input {
    width: 100%;
  } */
  .input-container {
    width: 90%;
  }
</style>

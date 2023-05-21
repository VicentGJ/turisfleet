<script lang="ts">
  import { LicenseCategory } from '$/lib/types/CategoryTypes'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  import { driverService } from '$services'
  export let showUpdate = false
  export let itemToUpdate: any
  const dispatch = createEventDispatcher()
  onMount(async () => {
    driverCategories = await driverService.getDriverCategories(
      itemToUpdate.id_driver
    )
  })
  let driverCategories: LicenseCategory[] = []
  let values = {
    name: itemToUpdate.name,
    address: itemToUpdate.address,
    id_number: itemToUpdate.id_number,
  }
  const cancel = () => {
    showUpdate = false
    itemToUpdate = undefined
  }
  const update = async () => {
    await driverService.updateDriver(itemToUpdate.id_driver, values)
    await driverService.deleteDriverCategories(itemToUpdate.id_driver)
    await driverService.setDriverCategories(
      itemToUpdate.id_driver,
      driverCategories
    )

    dispatch('updated')
    itemToUpdate = undefined
    showUpdate = false
  }
  const close = () => {
    cancel()
  }
</script>

<BaseForm
  title="Update Driver"
  primaryBtnTxt="Update Driver"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Name *</label>
      <input required type="text" bind:value={values.name} placeholder="name" />
    </div>
    <div class="input-container">
      <label for="">ID *</label>
      <input
        required
        type="text"
        bind:value={values.id_number}
        placeholder="id number"
      />
    </div>
    <div class="input-container">
      <label for="">License Category *</label>
      <select name="" id="" bind:value={driverCategories} multiple>
        {#each Object.values(LicenseCategory) as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Address *</label>
      <input
        required
        type="text"
        bind:value={values.address}
        placeholder="address"
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
  select {
    width: 100%;
    height: 150px;
  }

  .input-container {
    width: 90%;
  }
</style>

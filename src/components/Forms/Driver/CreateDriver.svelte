<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { driverService } from '$/lib/services/services'
  import { LicenseCategory } from '$lib/types/CategoryTypes'
  import BaseForm from '../BaseForm.svelte'
  export let showCreate = false
  let form: HTMLFormElement
  const dispatch = createEventDispatcher()
  let values = {
    address: '',
    name: '',
    id_number: '',
  }
  let categories: LicenseCategory[] = []

  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    driverService
      .createDriver(values)
      .then(async (driver) => {
        await driverService.setDriverCategories(driver.id_driver, categories)
      })
      .catch((err) => {})

    dispatch('created')
    showCreate = false
  }
  const close = () => {
    showCreate = false
  }
</script>

<BaseForm
  title="Insert Driver"
  primaryBtnTxt="Insert Driver"
  on:close-clicked={close}
  on:primary-clicked={create}
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
        maxlength="11"
        minlength="11"
        pattern="\d*"
      />
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
    <div class="input-container">
      <label for="">License Category *</label>
      <select multiple name="" id="" bind:value={categories} required>
        {#each Object.values(LicenseCategory) as option}
          <option value={option}>{option}</option>
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
  select {
    width: 100%;
    height: 150px;
  }
  .input-container {
    width: 90%;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { situationService } from '$/lib/services/services'
  import BaseForm from '../BaseForm.svelte'
  export let showCreate = false
  const dispatch = createEventDispatcher()
  let values = {
    situation_name: '',
    situation_type: 'car',
  }

  enum situation_types {
    car = 'car',
    driver = 'driver',
  }
  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    await situationService.createSituation(values)

    dispatch('created')
    showCreate = false
  }
  const close = () => {
    showCreate = false
  }
</script>

<BaseForm
  title="Insert Group"
  primaryBtnTxt="Insert Group"
  on:close-clicked={close}
  on:primary-clicked={create}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Situation name *</label>
      <input
        required
        type="text"
        bind:value={values.situation_name}
        placeholder="name"
      />
    </div>
    <div class="input-container">
      <label for="">Situation type *</label>
      <select name="" id="" bind:value={values.situation_type}>
        {#each Object.values(situation_types) as option}
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
  .input-container {
    width: 90%;
  }
</style>

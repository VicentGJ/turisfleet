<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { programService } from '$/lib/services/services'
  import BaseForm from '../BaseForm.svelte'
  export let showCreate = false
  const dispatch = createEventDispatcher()
  let values = {
    name: '',
  }

  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    await programService.createProgram(values)

    dispatch('created')
    showCreate = false
  }
  const close = () => {
    showCreate = false
  }
</script>

<BaseForm
  title="Insert Program"
  primaryBtnTxt="Insert Program"
  on:close-clicked={close}
  on:primary-clicked={create}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Program name *</label>
      <input required type="text" bind:value={values.name} placeholder="name" />
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

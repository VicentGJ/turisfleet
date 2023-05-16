<script lang="ts">
  import { LicenceCategory } from "$lib/types/DriverTypes";
  import { createEventDispatcher } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { programService } from "$services";
  import { loading } from "$/lib/stores/basic_stores";
  export let showUpdate = false;
  export let itemToUpdate: any;

  const dispatch = createEventDispatcher();
  let values = {
    name: itemToUpdate.program_name,
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
   
    await programService.updateProgram(itemToUpdate.id_program, values);
    
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
</script>

<BaseForm
  title="Update Program"
  primaryBtnTxt="Update Program"
  on:close-clicked={close}
  on:primary-clicked={update}
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

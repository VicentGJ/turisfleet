<script lang="ts">
  import { situationService } from "$services";
  import { createEventDispatcher, onMount } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  export let showUpdate = false;
  export let itemToUpdate: any;
  let situation_types = ["car", "driver"];
  onMount(async () => {});
  const dispatch = createEventDispatcher();
  let values = {
    situation_name: itemToUpdate.situation_name,
    situation_type: itemToUpdate.situation_type,
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
   
    await situationService.updateSituation(itemToUpdate.id_situation, values);
    
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
</script>

<BaseForm
  title="Update Situation"
  primaryBtnTxt="Update Situation"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Situation name *</label>
      <input required type="text" bind:value={values.situation_name} min="1" />
    </div>
    <div class="input-container">
      <label for="">Situation type *</label>
      <select name="" id="" bind:value={values.situation_type}>
        {#each situation_types as type}
          <option value={type}>{type}</option>
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
  input,
  select {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

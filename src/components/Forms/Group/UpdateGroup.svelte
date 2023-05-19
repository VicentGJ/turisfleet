<script lang="ts">
  import { LicenceCategory } from "$lib/types/DriverTypes";
  import { createEventDispatcher } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { groupService } from "$services";
  export let showUpdate = false;
  export let itemToUpdate: any;

  const dispatch = createEventDispatcher();
  let values = {
    country: itemToUpdate.country,
    tourist_amount: itemToUpdate.tourist_amount,
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
   
    await groupService.updateGroup(itemToUpdate.id_group, values);
    
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
</script>

<BaseForm
  title="Update Group"
  primaryBtnTxt="Update Group"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Country *</label>
      <input
        required
        type="text"
        bind:value={values.country}
        placeholder="country"
      />
    </div>
    <div class="input-container">
      <label for="">Tourist amount *</label>
      <input
        required
        type="number"
        bind:value={values.tourist_amount}
        placeholder="tourist amount"
        min="1"
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

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { groupService } from "$/lib/services/services";
  import BaseForm from "../BaseForm.svelte";
  export let showCreate = false;
  const dispatch = createEventDispatcher();
  $: values = {
    country: "",
    tourist_amount: 1,
  };

  const cancel = () => {
    showCreate = false;
  };
  const create = async () => {
   
    await groupService.createGroup(values);
    
    dispatch("created");
    showCreate = false;
  };
  const close = () => {
    showCreate = false;
  };
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

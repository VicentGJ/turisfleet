<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { driverService } from "$/lib/services/services";
  import { LicenceCategory } from "$lib/types/DriverTypes";
  import BaseForm from "../BaseForm.svelte";
  import { loading } from "$/lib/stores/basic_stores";
  export let showCreate = false;
  const dispatch = createEventDispatcher();
  $: values = {
    address: "",
    category: LicenceCategory.A,
    name: "",
    id_number: "",
  };

  const cancel = () => {
    showCreate = false;
  };
  const create = async () => {
    $loading = true;
    await driverService.createDriver(values);
    $loading = false;
    dispatch("created");
    showCreate = false;
  };
  const close = () => {
    showCreate = false;
  };
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
      />
    </div>
    <div class="input-container">
      <label for="">Licence Category *</label>
      <select name="" id="" bind:value={values.category}>
        {#each Object.values(LicenceCategory) as option}
          <option value={option}>{option}</option>
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
  .input-container {
    width: 90%;
  }
</style>

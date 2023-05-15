<script lang="ts">
  import { LicenceCategory } from "$lib/types/DriverTypes";
  import { createEventDispatcher, onMount } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { driverService, carService } from "$services";
  import { loading } from "$/lib/stores/basic_stores";
  export let showUpdate = false;
  export let itemToUpdate: any;
  let cars: any[] = [];
  const dispatch = createEventDispatcher();
  onMount(async () => {
    cars = [{ id_car: -1 }];
    $loading = true;
    await carService.getCars().then((c) => (cars = [...cars, ...c]));
    $loading = false;
  });
  let values = {
    name: itemToUpdate.name,
    address: itemToUpdate.address,
    id_number: itemToUpdate.id_number,
    id_car: itemToUpdate.idcar,
    category: itemToUpdate.category,
  };
  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
    $loading = true;
    await driverService.updateDriver(itemToUpdate.id_number, values);
    $loading = false;
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
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
      <label for="">Licence Category *</label>
      <select name="" id="" bind:value={values.category}>
        {#each Object.values(LicenceCategory) as category}
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
    <div class="input-container">
      <label for="">Car *</label>
      <select name="" id="" bind:value={values.id_car}>
        {#each cars as car}
          {#if car.id_car === -1}
            <option value={null} selected={itemToUpdate.idcar === null}>
              None
            </option>
          {:else}
            <option
              value={car.id_car}
              selected={itemToUpdate.idcar === car.id_car}
            >
              {[car.plate_number]}
              {car.brand}
            </option>
          {/if}
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

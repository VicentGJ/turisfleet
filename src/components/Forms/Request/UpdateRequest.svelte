<script lang="ts">
  import { LicenceCategory } from "$lib/types/DriverTypes";
  import { createEventDispatcher, onMount } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { requestService, carService, driverService } from "$services";
  import { loading } from "$/lib/stores/basic_stores";
  export let showUpdate = false;
  export let itemToUpdate: any;
  let drivers: any = [];
  let cars: any = [];
  $: copilots = [
    { id_driver: null, name: "None" },
    ...drivers.filter((d: any) => d.id_driver !== values.id_driver),
  ];
  onMount(async () => {
   
    await Promise.all([
      carService.getCars().then((c) => (cars = c)),
      driverService.getDrivers().then((d) => (drivers = d)),
    ]);
    
  });
  const dispatch = createEventDispatcher();
  let values = {
    id_car: itemToUpdate.id_car,
    id_driver: itemToUpdate.id_driver,
    id_copilot: itemToUpdate.id_copilot,
    //TODO: what other values area updateable
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
   
    await requestService.updateRequest(itemToUpdate.id_request, {
      ...values,
      // return_date: return_date ? null : return_date,
    });
    
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
</script>

<BaseForm
  title="Update Request"
  primaryBtnTxt="Update Request"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Driver *</label>
      <select name="" id="" bind:value={values.id_driver}>
        {#each drivers as driver}
          <option
            value={driver.id_driver}
            selected={driver.id_driver == values.id_driver}
          >
            {driver.name}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Copilot</label>
      <select name="" id="" bind:value={values.id_copilot}>
        {#each copilots as copilot}
          <option
            value={copilot.id_driver}
            selected={copilot.id_driver == values.id_copilot}
          >
            {copilot.name}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Car *</label>
      <select name="" id="" bind:value={values.id_car}>
        {#each cars as car}
          <option value={car.id_car} selected={car.id_car == values.id_car}
            >{[car.plate_number]} {car.brand}</option
          >
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
  select {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

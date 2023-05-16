<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { carService } from "$services";
  import { loading } from "$/lib/stores/basic_stores";
  export let showUpdate = false;
  export let itemToUpdate: any;

  const dispatch = createEventDispatcher();
  let values = {
    available_km: Number(itemToUpdate.available_km),
    plate_number: itemToUpdate.plate_number,
    seat_amount: itemToUpdate.seat_amount,
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
   
    await carService.updateCar(itemToUpdate.plate_number, values);
    
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
</script>

<BaseForm
  title="Update Car"
  primaryBtnTxt="Update Car"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Plate Number *</label>
      <input
        required
        type="text"
        bind:value={values.plate_number}
        placeholder="plate number"
      />
    </div>
    <div class="input-container">
      <label for="">Seat amount *</label>
      <input
        required
        type="number"
        min="1"
        max="100"
        bind:value={values.seat_amount}
        placeholder="seat amount"
      />
    </div>
    <div class="input-container">
      <label for="">Available KM *</label>
      <input
        required
        type="number"
        min="0"
        max="10000"
        bind:value={values.available_km}
        placeholder="available km"
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

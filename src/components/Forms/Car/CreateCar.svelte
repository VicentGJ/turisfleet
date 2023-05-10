<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { carService } from "$services";
  import { loading } from "$/lib/stores/basic_stores";
  export let showCreate = false;
  const dispatch = createEventDispatcher();
  $: values = {
    plate_number: "",
    brand: "",
    seat_amount: 1,
    available_km: 0,
  };

  const cancel = () => {
    showCreate = false;
  };
  const create = async () => {
    $loading = true;
    await carService.createCar(values);
    $loading = false;
    dispatch("created");
    showCreate = false;
  };
  const close = () => {
    showCreate = false;
  };
</script>

<BaseForm
  title="Insert Car"
  primaryBtnTxt="Insert Car"
  on:close-clicked={close}
  on:primary-clicked={create}
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
      <label for="">Brand *</label>
      <input
        required
        type="text"
        bind:value={values.brand}
        placeholder="brand"
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

<script lang="ts">
  import { loading } from "$/lib/stores/basic_stores";
  import { carService, situationService } from "$services";
  import { createEventDispatcher, onMount } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import type { Situation } from "$/lib/types/SituationTypes";
  import type { Car } from "$/lib/types/CarTypes";
  import dayjs from "dayjs";
  export let showUpdate = false;
  export let itemToUpdate: any;
  let situations: Situation[] = [];
  let cars: Car[] = [];
  onMount(async () => {
    $loading = true;
    await Promise.all([
      situationService.getSituations("ALL", "car").then((s) => {
        situations = s;
      }),
      carService.getCars().then((c) => {
        cars = c;
      }),
    ]);
    $loading = false;
  });
  const dispatch = createEventDispatcher();
  let values = {
    car_id_car: itemToUpdate.car_id_car,
    situation_id_situation: itemToUpdate.situation_id_situation,
    date: itemToUpdate.date,
    return_date: itemToUpdate.return_date,
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
    $loading = true;
    await situationService.updateCarSituation(
      { car_id_car: itemToUpdate.car_id_car, date: itemToUpdate.date },
      values
    );
    $loading = false;
    dispatch("updated");
    itemToUpdate = undefined;
    showUpdate = false;
  };
  const close = () => {
    cancel();
  };
  $: r = situations.some(
    (s) =>
      s.situation_name == "inside the country" &&
      s.id_situation == values.situation_id_situation
  );
</script>

<BaseForm
  title="Update Car Situation"
  primaryBtnTxt="Update Car Situation"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Car Situation *</label>
      <select name="" id="" bind:value={values.situation_id_situation}>
        {#each situations as situation}
          <option value={situation.id_situation}>
            {situation.situation_name}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Car *</label>
      <select name="" id="" bind:value={values.car_id_car}>
        {#each cars as car}
          <option value={car.id_car}>[{car.plate_number}] {car.brand}</option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Date *</label>
      <input
        type="date"
        bind:value={values.date}
        required
        placeholder="date"
        min={dayjs().format("YYYY-MM-DD")}
      />
    </div>
    <div class="input-container">
      <label for="">Return date {r ? "*" : ""}</label>
      <input
        required={r}
        type="date"
        bind:value={values.return_date}
        placeholder="return date"
        min={dayjs().format("YYYY-MM-DD")}
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

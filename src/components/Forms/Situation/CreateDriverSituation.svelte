<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { situationService, driverService } from "$/lib/services/services";
  import BaseForm from "../BaseForm.svelte";
  import { loading } from "$/lib/stores/basic_stores";
  import dayjs from "dayjs";
  export let showCreate = false;
  let situations: any = [];
  let drivers: any = [];
  const dispatch = createEventDispatcher();
  $: values = {
    date: dayjs().format("YYYY-MM-DD"),
    driver_id_driver: "",
    situation_id_situation: "",
    return_date: null,
  };
  onMount(async () => {
   
    await Promise.all([
      situationService.getSituations(200, "driver").then((s) => {
        situations = s;
        values.situation_id_situation = situations[0].id_situation;
      }),
      driverService.getDrivers().then((d) => {
        drivers = d;
        values.driver_id_driver = drivers[0].id_driver;
      }),
    ]);
    
  });

  const cancel = () => {
    showCreate = false;
  };
  const create = async () => {
   
    await situationService.createDriverSituation(values);
    
    dispatch("created");
    showCreate = false;
  };
  const close = () => {
    showCreate = false;
  };
</script>

<BaseForm
  title="Insert Driver Situation"
  primaryBtnTxt="Insert Driver Situation"
  on:close-clicked={close}
  on:primary-clicked={create}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Driver *</label>
      <select name="" id="" bind:value={values.driver_id_driver}>
        {#each drivers as driver}
          <option value={driver.id_driver}>{driver.name}</option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Situation *</label>
      <select name="" id="" bind:value={values.situation_id_situation}>
        {#each situations as situation}
          <option value={situation.id_situation}
            >{situation.situation_name}</option
          >
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
      <label for="">Return date</label>
      <input
        type="date"
        bind:value={values.return_date}
        placeholder="date"
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

<script lang="ts">
  import { durationObjToStr, durationStrToObj } from "$lib/utils";
  import { LicenceCategory } from "$lib/types/DriverTypes";
  import { createEventDispatcher, onMount } from "svelte";
  import BaseForm from "../BaseForm.svelte";
  import { programService } from "$services";
  import { loading } from "$/lib/stores/basic_stores";
  export let showUpdate = false;
  export let itemToUpdate: any;

  $: {
    console.log(itemToUpdate.duration);
    console.log(values.duration);
  }
  let programs: any = [];
  onMount(async () => {
    $loading = true;
    await programService.getPrograms().then((p) => (programs = p));
    $loading = false;
  });
  const dispatch = createEventDispatcher();
  let values = {
    description: itemToUpdate.description,
    duration: durationStrToObj(itemToUpdate.duration) as any,
    id_program: itemToUpdate.id_program,
    km: itemToUpdate.km,
    start: itemToUpdate.start,
  };

  const cancel = () => {
    showUpdate = false;
    itemToUpdate = undefined;
  };
  const update = async () => {
    $loading = true;
    await programService.updateSpecificProgram(
      itemToUpdate.id_specific_program,
      {
        ...values,
        duration: durationObjToStr(values.duration),
      }
    );
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
  title="Update Specific Program"
  primaryBtnTxt="Update Specific Program"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Program *</label>
      <select name="" id="" bind:value={values.id_program}>
        {#each programs as program, index}
          <option value={program.id_program}>{program.program_name}</option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Description *</label>
      <input
        required
        type="text"
        bind:value={values.description}
        placeholder="description"
      />
    </div>
    <div class="input-container">
      <label for="">Start *</label>
      <input
        required
        type="time"
        bind:value={values.start}
        placeholder="start"
      />
    </div>

    <div class="input-container">
      <label for="">Duration (days: hours: minutes)*</label>
      <div class="input-group">
        <input
          required
          type="number"
          min="0"
          bind:value={values.duration.days}
          placeholder="days"
        />
        <input
          required
          type="number"
          min="0"
          bind:value={values.duration.hours}
          placeholder="hours"
        />
        <input
          required
          type="number"
          min="0"
          bind:value={values.duration.minutes}
          placeholder="minutes"
        />
      </div>
    </div>
    <div class="input-container">
      <label for="">Distance(Km) *</label>
      <input
        required
        type="number"
        bind:value={values.km}
        placeholder="distance"
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
  .input-group {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: 100%;
  }
</style>

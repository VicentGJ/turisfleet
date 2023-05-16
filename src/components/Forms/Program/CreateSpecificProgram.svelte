<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { programService } from "$/lib/services/services";
  import BaseForm from "../BaseForm.svelte";
  import { loading } from "$/lib/stores/basic_stores";
  import { durationObjToStr } from "$/lib/utils";
  export let showCreate = false;
  let programs: any = [];

  const dispatch = createEventDispatcher();
  onMount(() => {
   
    programService.getPrograms().then((p) => {
      programs = p;
      values.id_program = programs[0].id_program;
      
    });
  });
  $: values = {
    description: "",
    duration: {
      days: "",
      hours: "",
      minutes: "",
    },
    id_program: 0,
    km: 0,
    start: "",
  };
  const cancel = () => {
    showCreate = false;
  };
  const create = async () => {
    let parsedValues = {
      ...values,
      duration: durationObjToStr(values.duration),
    };
   
    await programService.createSpecificProgram(parsedValues);
    
    dispatch("created");
    showCreate = false;
  };
  const close = () => {
    showCreate = false;
  };
</script>

<BaseForm
  title="Insert Specific Program"
  primaryBtnTxt="Insert Specific Program"
  on:close-clicked={close}
  on:primary-clicked={create}
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

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import dayjs from "dayjs";
  import {
    requestService,
    programService,
    groupService,
  } from "$/lib/services/services";
  import BaseForm from "../BaseForm.svelte";
  export let showCreate = false;
  let programs: any = [];
  let groups: any = [];

  const dispatch = createEventDispatcher();
  $: values = {
    id_group: "",
    id_program: "",
    start_date: dayjs().format("YYYY-MM-DD"),
  };

  onMount(async () => {
   
    await Promise.all([
      programService.getPrograms().then((p) => {
        programs = p;
        values.id_program = programs[0].id_program;
      }),
      groupService.getGroups().then((g) => {
        groups = g;
        values.id_group = groups[0].id_group;
      }),
    ]);
    
  });

  const cancel = () => {
    showCreate = false;
  };
  const create = async () => {
   
    await requestService.createRequest(values);
    
    dispatch("created");
    showCreate = false;
  };
  const close = () => {
    showCreate = false;
  };
</script>

<BaseForm
  title="Insert Request"
  primaryBtnTxt="Insert Request"
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
      <label for="">Group *</label>
      <select name="" id="" bind:value={values.id_group}>
        {#each groups as group, index}
          <option value={group.id_group}>
            {`${group.country} (${group.tourist_amount})`}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Start Date *</label>
      <input
        required
        type="date"
        bind:value={values.start_date}
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

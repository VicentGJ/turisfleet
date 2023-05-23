<script lang="ts">
  import {
    groupService,
    programService,
    requestService,
  } from '$/lib/services/services'
  import type { Group } from '$/lib/types/GroupTypes'
  import type { SpecificProgram } from '$/lib/types/ProgramTypes'
  import dayjs from 'dayjs'
  import { createEventDispatcher, onMount } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  export let showCreate = false
  let programs: SpecificProgram[] = []
  let groups: Group[] = []

  const dispatch = createEventDispatcher()
  let values = {
    id_group: -1,
    id_specific_program: -1,
    start_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    tourist_amount: 0,
  }

  onMount(async () => {
    await Promise.all([
      programService.getSpecificPrograms().then((p) => {
        programs = p
        values.id_specific_program = programs[0].id_specific_program
      }),
      groupService.getGroups().then((g) => {
        groups = g
        values.id_group = groups[0].id_group
      }),
    ])
  })

  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    await requestService.createRequest(values)

    dispatch('created')
    showCreate = false
  }
  const close = () => {
    showCreate = false
  }
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
      <label for="">Specific Program *</label>
      <select
        name=""
        id=""
        bind:value={values.id_specific_program}
        required
        class="program"
      >
        {#each programs as program, index}
          <option value={program.id_specific_program}
            >{program.description}</option
          >
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Group *</label>
      <select name="" id="" bind:value={values.id_group} required>
        {#each groups as group, index}
          <option value={group.id_group}>
            {`${group.country}`}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-container">
      <label for="">Tourist amount *</label>
      <input
        required
        type="number"
        bind:value={values.tourist_amount}
        min="1"
        max="50"
      />
    </div>
    <div class="input-container">
      <label for="">Start Date *</label>
      <input
        required
        type="date"
        bind:value={values.start_date}
        min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
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
    align-items: flex-start;
  }
  input {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
  .program {
    width: 300px;
  }
</style>

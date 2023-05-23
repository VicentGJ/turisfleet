<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { userService } from '$/lib/services/services'
  import BaseForm from '../BaseForm.svelte'
  import { errorMessage } from '$/lib/stores/basic_stores'
  import type { Role } from '$/lib/types/UserTypes'
  export let showCreate = false
  const dispatch = createEventDispatcher()
  let roles: Role[] = []
  onMount(async () => {
    roles = await userService.getRoles()
    values.id_role = roles[0].id_role
  })
  let values = {
    username: '',
    password: '',
    id_role: -1,
  }
  let password_conf = ''
  const cancel = () => {
    showCreate = false
  }
  const create = async () => {
    if (values.password === password_conf) {
      await userService.createUser(values)
      dispatch('created')
      showCreate = false
    } else {
      $errorMessage = {
        message: 'Passwords must match',
        type: 'error',
      }
    }
  }
  const close = () => {
    showCreate = false
  }
</script>

<BaseForm
  title="Insert User"
  primaryBtnTxt="Insert User"
  on:close-clicked={close}
  on:primary-clicked={create}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      <label for="">Username *</label>
      <input
        required
        type="text"
        bind:value={values.username}
        placeholder="username"
        min="5"
        max="255"
      />
    </div>
    <div class="input-container">
      <label for="">Password *</label>
      <input
        required
        type="password"
        bind:value={values.password}
        placeholder="password"
        pattern={'(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'}
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      />
    </div>
    <div class="input-container">
      <label for="">Password Confirmation *</label>
      <input
        required
        type="password"
        bind:value={password_conf}
        placeholder="password confirm"
        title="Must match the password"
      />
    </div>
    <div class="input-container">
      <label for="">User role *</label>
      <select name="" id="" bind:value={values.id_role}>
        {#each roles as role}
          <option
            value={role.id_role}
            selected={role.id_role === values.id_role}>{role.role_name}</option
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
  input {
    width: 100%;
  }
  .input-container {
    width: 90%;
  }
</style>

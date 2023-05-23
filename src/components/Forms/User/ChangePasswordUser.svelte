<script lang="ts">
  import { loggedUser } from '$/lib/stores/basic_stores'
  import type { User } from '$/lib/types/UserTypes'
  import { browser } from '$app/environment'
  import { authService, userService } from '$services'
  import { errorMessage } from '$stores/basic_stores'
  import { createEventDispatcher } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  export let showUpdate = false
  export let itemToUpdate: User
  let check_old_password = true
  let old_password = ''
  let password_conf = ''

  if (browser) {
    check_old_password =
      $loggedUser.role_name !== 'administrator' &&
      $loggedUser.role_name !== 'support'
  }
  const dispatch = createEventDispatcher()
  let values = {
    password: '',
  }

  const cancel = () => {
    showUpdate = false
  }
  const update = async () => {
    if (password_conf === values.password) {
      let authenticated = true
      if (check_old_password) {
        authenticated = await authService
          .login({
            username: itemToUpdate.username,
            password: old_password,
          })
          .then((d) => d.id_user === itemToUpdate.id_user)
          .catch((err) => (authenticated = false))
      }
      if (authenticated) {
        await userService.changePassword(itemToUpdate.id_user, values)
        dispatch('updated')
        showUpdate = false
      } else {
        $errorMessage = {
          type: 'error',
          message: 'Wrong password',
        }
      }
    } else {
      $errorMessage = {
        message: 'Passwords must match',
        type: 'error',
      }
    }
  }
  const close = () => {
    cancel()
  }
</script>

<BaseForm
  title="Change Password"
  primaryBtnTxt="Change Password"
  on:close-clicked={close}
  on:primary-clicked={update}
  on:secondary-clicked={cancel}
>
  <div class="form-body">
    <div class="input-container">
      {#if check_old_password}
        <div class="input-container">
          <label for="">Current password *</label>
          <input
            required
            type="password"
            bind:value={old_password}
            placeholder="old password"
          />
        </div>
      {/if}
      <label for="">New password *</label>
      <input
        required
        type="password"
        bind:value={values.password}
        placeholder="new password"
        pattern={'(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'}
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      />
    </div>
    <div class="input-container">
      <label for="">New password confirmation *</label>
      <input
        required
        type="password"
        bind:value={password_conf}
        placeholder="password confirm"
        title="Must match the password"
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

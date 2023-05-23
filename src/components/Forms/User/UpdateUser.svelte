<script lang="ts">
  import { userService } from '$services'
  import { createEventDispatcher } from 'svelte'
  import BaseForm from '../BaseForm.svelte'
  import type { User } from '$/lib/types/UserTypes'
  import Button from '$/components/Shared/Button.svelte'
  export let showUpdate = false
  export let itemToUpdate: User

  const dispatch = createEventDispatcher()
  let values = {
    username: itemToUpdate.username,
  }

  const cancel = () => {
    showUpdate = false
  }
  const update = async () => {
    await userService.updateUser(itemToUpdate.id_user, values)

    dispatch('updated')
    showUpdate = false
  }
  const close = () => {
    cancel()
  }
</script>

<BaseForm
  title="Update User"
  primaryBtnTxt="Update User"
  on:close-clicked={close}
  on:primary-clicked={update}
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
  </div>
  <svelte:fragment slot="extra-footer-middle">
    <Button
      text="Change Password"
      on:click={() => {
        dispatch('change-password')
      }}
    />
  </svelte:fragment>
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

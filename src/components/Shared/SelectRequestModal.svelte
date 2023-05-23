<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Request } from '$lib/types/RequestTypes'
  import dayjs from 'dayjs'
  import Button from './Button.svelte'
  import { fade, scale } from 'svelte/transition'
  import { requestService } from '$/lib/services/services'
  import { popup } from '$/lib/stores/basic_stores'
  export let selected: number | undefined
  const dispatch = createEventDispatcher()
  let requests: Request[] = []
  let form: HTMLFormElement
  onMount(async () => {
    requests = await requestService.getRequests()
    if (requests.length > 0) selected = requests[0].id_request
    else {
      $popup = {
        message: 'There are no requests',
        type: 'info',
      }
      handleSecondaryClicked()
    }
  })
  const handleSecondaryClicked = () => {
    selected = undefined
    dispatch('close')
  }
  const handlePrimaryClicked = () => {
    if (form.reportValidity()) dispatch('selected')
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="picker-backdrop"
  on:click|capture|preventDefault|stopPropagation|self={handleSecondaryClicked}
  in:fade={{ duration: 200 }}
  out:fade={{ delay: 100, duration: 200 }}
>
  <div
    class="picker-wrapper"
    in:scale={{ delay: 100, duration: 200 }}
    out:scale={{ duration: 200 }}
  >
    <h3 class="header">Select a request</h3>
    <form action="" bind:this={form}>
      <div class="body">
        <div class="input-container">
          <label for="date-picker-input">Request*</label>
          <select name="" id="" required bind:value={selected}>
            {#each requests as item, index}
              <option value={item.id_request}>
                ({item.date}) [{item.country}] {item.description}
              </option>
            {/each}
          </select>
        </div>
      </div>
      <div class="footer">
        <Button
          text="Cancel"
          type="secondary"
          on:click={handleSecondaryClicked}
        />
        <Button text="Select" on:click={handlePrimaryClicked} />
      </div>
    </form>
  </div>
</div>

<style>
  .picker-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(58, 58, 58, 0.322);
    z-index: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .picker-wrapper {
    max-height: 90vh;
    height: fit-content;
    width: fit-content;
    background-color: white;
    border-radius: 4px;
    box-shadow: var(--default-shadow);
    padding: 15px;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    gap: 20px;
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 16px;
  }
  .input-container {
    width: 50%;
  }
</style>

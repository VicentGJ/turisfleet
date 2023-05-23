<script lang="ts">
  import { carService, requestService } from '$/lib/services/services'
  import { popup } from '$/lib/stores/basic_stores'
  import type { Car } from '$/lib/types/CarTypes'
  import { createEventDispatcher, onMount } from 'svelte'
  import { fade, scale } from 'svelte/transition'
  import Button from './Button.svelte'
  import dayjs from 'dayjs'
  let selected: number
  let dateselected: string = dayjs().format('YYYY-MMM-DD')
  const dispatch = createEventDispatcher()
  let cars: Car[] = []
  let form: HTMLFormElement
  onMount(async () => {
    cars = await carService.getCars()
    if (cars.length > 0) selected = cars[0].id_car
    else {
      $popup = {
        message: 'There are no cars',
        type: 'info',
      }
      handleSecondaryClicked()
    }
  })
  const handleSecondaryClicked = () => {
    dispatch('close')
  }
  const handlePrimaryClicked = () => {
    if (form.reportValidity())
      dispatch('selected', {
        date: dayjs(dateselected).format('YYYY-MM-DD'),
        id_car: selected,
      })
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
          <label for="date-picker-input">Date*</label>
          <input bind:value={dateselected} type="date" required />
        </div>
        <div class="input-container">
          <label for="date-picker-input">Car*</label>
          <select name="" id="" required bind:value={selected}>
            {#each cars as item, index}
              <option value={item.id_car}>
                [{item.plate_number}] {item.brand}
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
    gap: 16px;
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

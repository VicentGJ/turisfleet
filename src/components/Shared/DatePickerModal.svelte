<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import dayjs from 'dayjs'
  import Button from './Button.svelte'
  export let value: Date | string | undefined = undefined
  export let required = false
  let form: HTMLFormElement
  const dispatch = createEventDispatcher()
  //   export let min: string;
  //   export let max: string;

  //   $: if (min) min = dayjs(min).format("YYYY-MM-DD");
  //   $: if (max) max = dayjs(max).format("YYYY-MM-DD");

  const handleSecondaryClicked = () => {
    dispatch('close')
  }
  const handlePrimaryClicked = () => {
    if (form.reportValidity()) dispatch('selected')
  }
</script>

<div class="picker-backdrop">
  <div class="picker-wrapper">
    <h3 class="header">Select a date</h3>
    <form action="" bind:this={form}>
      <div class="body">
        <div class="input-container">
          <label for="date-picker-input">Date {required ? '*' : ''}</label>
          <input
            id="date-picker-input"
            type="date"
            name="date-picker"
            bind:value
            {required}
          />
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
    width: 30vw;
    background-color: white;
    border-radius: 4px;
    box-shadow: var(--default-shadow);
    padding: 15px;
    position: relative;
  }
  form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    gap: 20px;
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 16px;
  }
  input {
    width: 100%;
  }
  .input-container {
    width: 50%;
  }
</style>

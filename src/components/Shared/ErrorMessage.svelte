<script lang="ts">
  import { errorMessage } from '$stores/basic_stores'
  import { fade, scale } from 'svelte/transition'
  import Button from './Button.svelte'
  const close = () => {
    $errorMessage = {
      type: 'error',
      message: '',
    }
  }
  $: type = $errorMessage.type
  const keydown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === 'Escape') close()
  }
</script>

<svelte:window on:keydown|capture|preventDefault|stopPropagation={keydown} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="backdrop"
  in:fade={{ duration: 200 }}
  out:fade={{ delay: 100, duration: 200 }}
  on:click|self|capture|preventDefault|stopPropagation={close}
>
  <div
    class="content {type}"
    in:scale={{ delay: 100, duration: 200 }}
    out:scale={{ duration: 200 }}
  >
    <div class="header">
      {#if type == 'error'}
        <img src="/error.svg" alt="" />
      {:else}
        <img src="/warning.png" alt="" />
      {/if}
      <h2>
        {#if type == 'error'}
          Error!
        {:else}
          Warning!
        {/if}
      </h2>
    </div>
    <div class="body">
      <p class="text">
        <slot name="text">{$errorMessage.message}</slot>
      </p>
    </div>
    <div class="footer">
      <Button text="OK" on:click={close} />
    </div>
  </div>
</div>

<style>
  .backdrop {
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
  .content {
    max-height: 90vh;
    height: fit-content;
    overflow-y: scroll;
    width: fit-content;
    /* max-width: 40vw; */
    min-width: 20vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: var(--default-shadow);
    padding: 0;
    position: relative;
  }
  .header {
    position: sticky;
    background-color: inherit;
    padding: 15px;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid rgba(210, 208, 208, 0.587);
  }
  h2 {
    margin: 0;
  }
  img {
    height: 40px;
  }
  .body {
    padding: 15px;
  }
  .text {
    /* color: #e04242; */
    /* text-align: justify; */
    white-space: pre;
    font-weight: 700;
  }
  .footer {
    position: sticky;
    bottom: 0;
    width: 100%;
    background-color: inherit;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .error {
    background-color: rgb(255, 240, 240);
  }
  .warning {
    background-color: rgb(250, 254, 212);
  }
</style>

<script lang="ts">
  import { popup } from '$stores/basic_stores'
  import { fade, scale } from 'svelte/transition'
  import Button from './Button.svelte'
  const close = () => {
    $popup = {
      type: 'error',
      message: '',
    }
  }
  $: type = $popup.type
  const keydown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === 'Escape') close()
  }
  let header: string
  $: switch (type) {
    case 'info':
      header = 'Info'
      break
    case 'error':
      header = 'Error'
      break
    case 'warning':
      header = 'Warning'
      break
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
      {:else if (type = 'info')}
        <img src="/info.png" alt="" />
      {:else}
        <img src="/warning.png" alt="" />
      {/if}
      <h2>
        {header}
      </h2>
    </div>
    <div class="body">
      <p class="text">
        <slot name="text">{$popup.message}</slot>
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
    max-width: 40vw;
    min-width: 20vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: var(--default-shadow);
    padding: 0;
    position: relative;
    overflow-x: hidden;
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
    padding: 8px 0;
  }

  .error {
    background-color: rgb(255, 240, 240);
  }
  .warning {
    background-color: rgb(250, 254, 212);
  }
  .info {
    background-color: rgb(229, 229, 255);
  }
</style>

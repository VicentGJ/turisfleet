<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";
  export let showConfirmation = false;
  const dispatch = createEventDispatcher();
  const close = () => {
    showConfirmation = false;
  };
  const confirm = () => {
    dispatch("confirm");
    showConfirmation = false;
  };
  const handlekeydown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") confirm();
    else if (ev.key === "Escape") close();
  };
</script>

<svelte:window
  on:keydown|capture|preventDefault|stopPropagation={handlekeydown}
/>
<div class="confirmation-container-base">
  <div class="confirmation">
    <div class="wrapper">
      <div class="confirmation-header">
        <h2>Warning!</h2>
      </div>
      <div class="confirmation-body">
        <span class="text">Are you sure you want to delete this row</span>
      </div>
    </div>
    <div class="confirmation-footer">
      <Button text="no" on:click={close} type="secondary" />
      <Button text="yes" on:click={confirm} />
    </div>
  </div>
</div>

<style>
  .confirmation-container-base {
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
  .confirmation {
    background-color: white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0px 1px 4px 0px #5a5a5a94;
  }
  h2 {
    color: rgba(0, 0, 0, 0.827);
  }

  .confirmation-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
  }
</style>

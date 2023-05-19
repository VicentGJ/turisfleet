<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../Shared/Button.svelte";
  const dispatch = createEventDispatcher();
  export let title = "";
  export let primaryBtnTxt = "";
  export let secondaryBtnTxt = "Cancel";
  let form: HTMLFormElement;
  const primaryClicked = () => {
    form.reportValidity() && dispatch("primary-clicked");
  };
  const secondaryClicked = () => {
    dispatch("secondary-clicked");
  };
  const closeClicked = () => {
    dispatch("close-clicked");
  };

  const handlekeydown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter") primaryClicked();
    else if (ev.key === "Escape") closeClicked();
  };
</script>

<svelte:window on:keydown|stopPropagation={handlekeydown} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="form-base-container"
  on:click|self|capture|stopPropagation={closeClicked}
>
  <div class="form">
    <div class="separator">
      <div class="form-header">
        <h1>
          {title}
        </h1>
        <div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <img
            src="/close-square.svg"
            alt=""
            class="clickable-icon"
            on:click={closeClicked}
          />
        </div>
      </div>
      <div class="form-body">
        <form action="" bind:this={form}>
          <slot />
        </form>
      </div>
    </div>
    <div class="form-footer">
      <div class="buttons-container">
        <Button
          bind:text={secondaryBtnTxt}
          on:click={secondaryClicked}
          type="secondary"
        />
        <Button bind:text={primaryBtnTxt} on:click={primaryClicked} />
      </div>
    </div>
  </div>
</div>

<style>
  .form-base-container {
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
  .form {
    max-height: 90vh;
    height: fit-content;
    overflow-y: scroll;
    width: 40vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: var(--default-shadow);
    padding: 15px;
    position: relative;
  }

  .form-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  h1 {
    text-align: center;
    margin: 0;
    width: 100%;
  }

  .form-body {
    height: 100%;
    width: 100%;
  }
  .form-footer {
    background-color: inherit;
    margin-top: 15px;
    position: sticky;
    bottom: 0;
  }
  .buttons-container {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
  .separator {
    width: 100%;
    height: 100%;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let text = "";
  export let type: "primary" | "secondary" | "danger" = "primary";
  export let disabled = false;
  const dispatch = createEventDispatcher();
  const click = () => {
    dispatch("click");
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={click} class:disabled class="button noselect {type}">
  {text}
</div>

<style>
  .button {
    font-weight: 500;
    padding: 6px 5px;
    border-radius: 4px;
    width: fit-content;
    cursor: pointer;
  }
  .button:hover {
    transform: scale(102%);
    transition: all;
    transition-duration: 150ms;
    box-shadow: 0px 1px 4px 0px #5a5a5a94;
  }
  .primary {
    background-color: #009fa3;
    color: white;
  }
  .secondary {
    background-color: inherit;
    color: #00165b;
    border: 1px solid #00165b;
  }
  .danger {
    background-color: #a31000;
    color: white;
  }
</style>

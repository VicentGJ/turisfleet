<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let text = ''
  export let type: 'primary' | 'secondary' | 'danger' = 'primary'
  export let disabled = false
  export let tooltip = ''
  const dispatch = createEventDispatcher()
  const click = () => {
    if (!disabled) dispatch('click')
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span title={tooltip}>
  <div on:click={click} class:disabled class="button noselect {type}">
    {text}
  </div>
</span>

<style>
  .button {
    font-weight: 500;
    padding: 6px 10px;
    border-radius: 4px;
    width: fit-content;
    cursor: pointer;
  }
  .button:hover {
    transform: scale(102%);
    transition: all;
    transition-duration: 150ms;
    box-shadow: var(--default-shadow);
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
  .disabled {
    pointer-events: none;
    opacity: 0.4;
  }
</style>

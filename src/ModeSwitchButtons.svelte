<script>
  import { Mode } from "./store.js";
</script>

<style>
  button {
    margin-left: 1em;
    padding: 10px 1em;
    background-color: white;
    color: #1e90ff;
    font-size: 1.1em;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
    border: none;
    border-bottom: 2px solid white;
    outline: none;
    transition: all 0.33s ease;
  }

  button.active {
    border-color: #1e90ff;
  }
  button:hover {
    color: #135a9f;
  }
</style>

<button class={$Mode == 'kw' ? 'active' : ''} on:click={() => Mode.set('kw')}>
  Key Workers
</button>
<button class={$Mode == 'st' ? 'active' : ''} on:click={() => Mode.set('st')}>
  Staff
</button>

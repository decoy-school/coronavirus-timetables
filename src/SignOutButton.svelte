<script>
  import { Auth } from "./firebase.js";
</script>

<style>
  button {
    color: white;
    font-size: 1.1em;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
    background-color: #1e90ff;
    border: none;
    outline: none;
    padding: 10px 1em;
    border-radius: 10px;
    transition: background-color 0.33s ease;
  }
  button:hover {
    background-color: #135a9f;
  }
</style>

<button on:click={() => Auth.signOut()}>Sign out</button>

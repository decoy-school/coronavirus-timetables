<script>
  import { Auth } from "./firebase.js";
</script>

<style>
  button {
    margin-left: 1em;
    padding: 10px 1em;
    background-color: #1e90ff;
    color: white;
    font-size: 1.1em;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
    border: none;
    outline: none;
    border-radius: 10px;
    transition: background-color 0.33s ease;
  }
  button:hover {
    background-color: #135a9f;
  }
</style>

<button on:click={() => Auth.signOut()}>Sign out</button>

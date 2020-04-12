<script>
  import { fade } from "svelte/transition";
  import { Auth, GoogleProvider } from "./firebase.js";
  import { IsInvalidUser } from "./store.js";

  let isLoading = false;
  const signIn = () => {
    isLoading = true;
    Auth.signInWithPopup(GoogleProvider)
      .then(() => (isLoading = false))
      .catch(err => {
        console.error(err);
        isLoading = false;
      }); // better error handling here!
  };
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }

  button {
    margin: 0.3em;
    padding: 10px 1em;
    font-size: 1.3em;
    width: 200px;
    color: white;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
    background-color: #1e90ff;
    border: none;
    outline: none;
    border-radius: 10px;
    transition: background-color 0.33s ease;
  }

  button:disabled {
    background-color: lightgrey;
  }

  button:disabled:hover {
    background-color: lightgrey;
  }

  button:hover {
    background-color: #135a9f;
  }

  p {
    font-size: 1.3em;
  }
</style>

<div>
  <p>You are not signed in.</p>
  <button disabled={isLoading} on:click={signIn}>
    {isLoading ? 'Loading...' : 'Sign In'}
  </button>
  {#if $IsInvalidUser}
    <p transition:fade style={'color: orangered'}>
      Sorry, that's not a valid user account.
    </p>
  {/if}
</div>

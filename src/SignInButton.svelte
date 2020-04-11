<script>
  import { Auth, GoogleProvider } from "./firebase.js";
  const signIn = () => {
    Auth.signInWithPopup(GoogleProvider)
      .then()
      .catch(err => console.error(err)); // better error handling here!
  };
</script>

<button on:click={signIn}>Sign In</button>

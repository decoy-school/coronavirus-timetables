<script>
  import { Auth } from "./firebase.js";
</script>

<button on:click={() => Auth.signOut()}>Sign out</button>

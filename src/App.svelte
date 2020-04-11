<script>
  import { Auth, GoogleProvider, DB } from "./firebase.js";
  import { onMount } from "svelte";

  const authorizedUsers = [
    "sball@decoyschool.co.uk",
    "hpoustie@decoyschool.co.uk",
    "dlee@decoyschool.co.uk",
    "vstables@decoyschool.co.uk",
    "ymorrell@decoyschool.co.uk",
    "rhughes@decoyschool.co.uk",
    "kdicken@decoyschool.co.uk",
    "jedwards@decoyschool.co.uk",
    "dohalloran@decoyschool.co.uk"
  ];

  $: docs = [];
  $: user = null;

  onMount(() => {});

  const signIn = () => {
    Auth.signInWithPopup(GoogleProvider)
      .then()
      .catch(err => console.error(err)); // better error handling here!
  };

  Auth.onAuthStateChanged(usr => {
    user = usr;
    // if there's no user (i.e. this is a signout)
    if (!user) {
      docs = [];
      return;
    }
    if (user) {
      if (authorizedUsers.includes(user.email)) {
        DB.collection("key-workers-2020-04-13").onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            docs = [...docs, doc.data()];
          });
        });
      } else {
        console.log("sorry, that's not a valid user account");
        Auth.signOut();
        docs = [];
      }
    }
  });

  const formatData = obj => JSON.stringify(obj, null, 2);
</script>

{#if user}
  <button on:click={() => Auth.signOut()}>Sign out</button>
  <pre>{formatData(docs)}</pre>
{:else}
  <button on:click={signIn}>Sign in</button>
{/if}

<script>
  import { Auth, GoogleProvider, DB } from "./firebase.js";
  import { onMount } from "svelte";
  import SignInButton from "./SignInButton.svelte";
  import SignOutButton from "./SignOutButton.svelte";

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

  Auth.onAuthStateChanged(usr => {
    // if there's no user (i.e. this is a signout)
    if (!usr) {
      user = null;
      docs = [];
      return;
    }
    // if there is a user (i.e. this is a signin)
    if (usr) {
      // is this a user in the list above?
      if (authorizedUsers.includes(usr.email)) {
        user = usr;
        DB.collection("key-workers-2020-04-13").onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            docs = [...docs, doc.data()];
          });
        });
        // if not in the list above, sign them out.
      } else {
        user = null;
        console.log("sorry, that's not a valid user account");
        Auth.signOut();
        docs = [];
      }
    }
  });

  $: keys = docs.map(doc => Object.keys(doc));

  // helper function for displaying with <pre>s
  const formatData = obj => JSON.stringify(obj, null, 2);
</script>

{#if user}
  <SignOutButton />
  <pre>{keys}</pre>
  {#each keys as key}
    {#each key as k}
      <p>{k}</p>
    {/each}
  {/each}
{:else}
  <SignInButton />
{/if}

<script>
  import { Auth, DB } from "./firebase.js";
  import { onMount } from "svelte";
  import { User, Docs, ParsedDays, Dates } from "./store.js";
  import SignInButton from "./SignInButton.svelte";
  import SignOutButton from "./SignOutButton.svelte";
  import DayTimetable from "./DayTimetable.svelte";

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

  // HELPER FUNCTIONS
  // helper function for displaying with raw data
  const formatData = obj => JSON.stringify(obj, null, 2);
  // helper function to delete a record from firestore DB
  const deleteRecord = id => {
    DB.collection("key-workers-2020-04-13")
      .doc(id)
      .delete()
      .then(() => console.log(`deleted record with id: ${id}`))
      .catch(err => console.error(`error: ${err}`));
  };

  // AUTH STATE
  Auth.onAuthStateChanged(usr => {
    // if there's no user (i.e. this is a signout)
    if (!usr) {
      User.set(null);
      Docs.set([]);
      return;
    }
    // if there is a User (i.e. this is a signin)
    if (usr) {
      // is this a User in the list above?
      if (authorizedUsers.includes(usr.email)) {
        User.set(usr);
        DB.collection("key-workers-2020-04-13").onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            Docs.set([...$Docs, doc.data()]);
          });
        });
        // if not in the list above, sign them out.
      } else {
        User.set(null);
        console.log("sorry, that's not a valid User account");
        Auth.signOut();
        Docs.set([]);
      }
    }
  });
</script>

{#if $User}
  <header>
    <h1>Decoy School Key Worker Timetable</h1>
    <SignOutButton />
  </header>
  {#each $Dates as date}
    <DayTimetable {date} data={$ParsedDays[date]} />
  {/each}
{:else}
  <SignInButton />
{/if}

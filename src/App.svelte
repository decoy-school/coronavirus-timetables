<script>
  import { Auth, DB } from "./firebase.js";
  import { slide, fade, fly } from "svelte/transition";
  import {
    User,
    IsInvalidUser,
    Docs,
    Mode,
    ParsedDays,
    Dates
  } from "./store.js";
  import SignInView from "./SignInView.svelte";
  import SignOutButton from "./SignOutButton.svelte";
  import ModeSwitchButtons from "./ModeSwitchButtons.svelte";
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
        IsInvalidUser.set(false);
        DB.collection("key-workers-2020-04-13").onSnapshot(snapshot => {
          Docs.set([]);
          snapshot.forEach(doc => {
            Docs.set([...$Docs, doc.data()]);
          });
        });
        // if not in the list above, sign them out.
      } else {
        User.set(null);
        IsInvalidUser.set(true);
        console.log("sorry, that's not a valid User account");
        Auth.signOut();
        Docs.set([]);
      }
    }
  });
</script>

<style>
  #app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1em;
  }
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  #controls {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

<div id="app-container">
  {#if $User}
    <div transition:fade id="timetable-container">
      <header>
        <div id="controls">
          <h1>Decoy School Coronavirus Timetables</h1>
          <ModeSwitchButtons />
        </div>
        <SignOutButton />
      </header>
      {#if $Mode == 'kw'}
        <div
          in:fly={{ delay: 500, x: -1000 }}
          out:fly={{ x: 1000 }}
          id="key-workers-container">
          <h2>Timetable for Children of Key Workers</h2>
          {#each $Dates as date}
            <DayTimetable {date} data={$ParsedDays[date]} />
          {/each}
        </div>
      {:else}
        <div
          in:fly={{ delay: 500, x: -1000 }}
          out:fly={{ x: 1000 }}
          id="staff-container">
          <h2>Staff Availability Timetable</h2>
          <p>Work in progress!</p>
        </div>
      {/if}
    </div>
  {:else}
    <div transition:fade id="sign-in-container">
      <SignInView />
    </div>
  {/if}
</div>

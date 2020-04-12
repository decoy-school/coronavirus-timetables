<script>
  import { slide } from "svelte/transition";
  export let date;
  export let data;

  let visible = false;

  // date parsing for title display
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  $: displayDate = new Date(date).toLocaleDateString("en-GB", options);
</script>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  h2 {
    margin-left: 1em;
  }

  button {
    background-color: dodgerblue;
    border: none;
    outline: none;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background-color 0.33s ease;
  }
  button:hover {
    background-color: #135a9f;
  }

  img {
    transition: transform 0.33s ease;
  }

  img.open {
    transform: rotate(180deg);
  }

  table {
    box-sizing: border-box;
    border-collapse: collapse;
    width: 100%;
    border-top: 1px solid dodgerblue;
    border-bottom: 1px solid dodgerblue;
  }
  th,
  td {
    padding: 5px 1em;
    border-left: 1px solid dodgerblue;
    border-right: 1px solid dodgerblue;
  }
  th {
    text-align: left;
    border-bottom: 1px solid dodgerblue;
  }
  tr:nth-child(even) {
    background-color: #e9f4ff;
  }
  td ul {
    padding: 0;
    list-style-type: none;
  }
  p {
    font-size: 1.3em;
  }
</style>

<header>
  <button on:click={() => (visible = !visible)}>
    <img
      class={visible ? 'open' : ''}
      src="more.svg"
      alt="toggle day details" />
  </button>
  <h2>{displayDate}</h2>
</header>

{#if visible}
  <div transition:slide>
    <table>
      <tr>
        <th />
        <th>Breakfast Club</th>
        <th>AM</th>
        <th>PM</th>
        <th>After School Club</th>
      </tr>
      <tr>
        <td>Names</td>
        <td>
          <ul>
            {#each data['Breakfast Club'].names as name}
              <li>{name}</li>
            {/each}
          </ul>
        </td>
        <td>
          <ul>
            {#each data['AM'].names as name}
              <li>{name}</li>
            {/each}
          </ul>
        </td>
        <td>
          <ul>
            {#each data['PM'].names as name}
              <li>{name}</li>
            {/each}
          </ul>
        </td>
        <td>
          <ul>
            {#each data['After School Club'].names as name}
              <li>{name}</li>
            {/each}
          </ul>
        </td>
      </tr>
      <tr>
        <td>Nursery</td>
        <td>{data['Breakfast Club']['Nursery']}</td>
        <td>{data['AM']['Nursery']}</td>
        <td>{data['PM']['Nursery']}</td>
        <td>{data['After School Club']['Nursery']}</td>
      </tr>
      <tr>
        <td>Reception</td>
        <td>{data['Breakfast Club']['Reception']}</td>
        <td>{data['AM']['Reception']}</td>
        <td>{data['PM']['Reception']}</td>
        <td>{data['After School Club']['Reception']}</td>
      </tr>
      <tr>
        <td>Year 1</td>
        <td>{data['Breakfast Club']['Year 1']}</td>
        <td>{data['AM']['Year 1']}</td>
        <td>{data['PM']['Year 1']}</td>
        <td>{data['After School Club']['Year 1']}</td>
      </tr>
      <tr>
        <td>Year 2</td>
        <td>{data['Breakfast Club']['Year 2']}</td>
        <td>{data['AM']['Year 2']}</td>
        <td>{data['PM']['Year 2']}</td>
        <td>{data['After School Club']['Year 2']}</td>
      </tr>
      <tr>
        <td>Year 3</td>
        <td>{data['Breakfast Club']['Year 3']}</td>
        <td>{data['AM']['Year 3']}</td>
        <td>{data['PM']['Year 3']}</td>
        <td>{data['After School Club']['Year 3']}</td>
      </tr>
      <tr>
        <td>Year 4</td>
        <td>{data['Breakfast Club']['Year 4']}</td>
        <td>{data['AM']['Year 4']}</td>
        <td>{data['PM']['Year 4']}</td>
        <td>{data['After School Club']['Year 4']}</td>
      </tr>

      <tr>
        <td>Year 5</td>
        <td>{data['Breakfast Club']['Year 5']}</td>
        <td>{data['AM']['Year 5']}</td>
        <td>{data['PM']['Year 5']}</td>
        <td>{data['After School Club']['Year 5']}</td>
      </tr>
      <tr>
        <td>Year 6</td>
        <td>{data['Breakfast Club']['Year 6']}</td>
        <td>{data['AM']['Year 6']}</td>
        <td>{data['PM']['Year 6']}</td>
        <td>{data['After School Club']['Year 6']}</td>
      </tr>
    </table>
    <p>School meals: {data['school-meals']}</p>
  </div>
{/if}

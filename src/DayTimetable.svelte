<script>
  export let date;
  export let data;

  let visible = false;
  const formatData = obj => JSON.stringify(obj, null, 2);
</script>

<header>
  <h2>{date}</h2>
  <button on:click={() => (visible = !visible)}>Show/hide</button>
</header>

{#if visible}
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
    <tr>
      <td>School meals</td>
      <td colspan="4">{data['school-meals']}</td>
    </tr>
  </table>
{/if}

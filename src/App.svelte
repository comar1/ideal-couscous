<script>
  import { onMount } from "svelte";

  let films = [];
  let test = "";
  let testData = [];

  async function fetchData() {
    try {
      const response = await fetch("/api/films");
      if (response.ok) {
        films = await response.json();
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch("/api/test");
      if (response.ok) {
        test = await response.json();
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Make the API request
  fetch("/api/test")
    .then((response) => response.json())
    .then((data) => {
      // Display the response in the frontend
      console.log(data.message); // Success
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });

  fetchData();

  onMount(async () => {
    // Make an HTTP GET request to the backend API endpoint
    const response = await fetch("/api/testdata");
    testData = await response.json();
  });

  let API_URL = "http://localhost:3000/";
  function refreshList() {
    fetch(API_URL + "api/hello")
      .then((res) => res.json())
      .then((data) => {
        test = data;
      });
  }

  onMount(async () => {
    refreshList();
  });
</script>

<main>
  <h1>Film List</h1>

  {#if films.length > 0}
    <ul>
      {#each films as film}
        <li>{film.title}</li>
        <li>{film.description}</li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}

  <p>test is {test}</p>

  <h1>Test Data</h1>
  <ul>
    {#each testData as item}
      <li>{item.name}: {item.value}</li>
    {/each}
  </ul>

  <h4>{test} HAHA!</h4>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

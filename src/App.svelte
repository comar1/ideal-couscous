<script>
  import { onMount } from "svelte";

  let films = [];
  let test = "";
  let testData = [];
  let API_URL = "http://localhost:3000/";

  // async function fetchData() {
  //   try {
  //     const response = await fetch("/api/films");
  //     if (response.ok) {
  //       films = await response.json();
  //     } else {
  //       console.error("Error fetching data:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }

  // }

  onMount(async () => {
    // Make an HTTP GET request to the backend API endpoint
    const response = await fetch("/api/testdata");
    testData = await response.json();
  });

  function refreshList() {
    fetch(API_URL + "api/hello")
      .then((res) => res.json())
      .then((data) => {
        test = data;
      });
  }
  async function apiTestData() {
    try {
      // fetch(API_URL + "api/testdata")
      //   .then((res) => res.json());
      // .then((data) => {
      //   testData = data;
      // });
      const res = await fetch(API_URL + "api/films");
      if (res.ok) {
        films = await res.json();
        console.log("testData present");
      } else {
        console.log("failed to catch json");
      }
    } catch {
      console.log("error fetching test");
    }
  }
  let promise = apiTestData();

  async function film1() {}
  onMount(async () => {
    apiTestData();
  });

  let name = "";
  let password = "";
  let description = "";

  async function handleSubmit() {
    // Handle form submission here (to be implemented in Step 2)
    const formData = { name, password, description };
    try {
      const response = await fetch(API_URL + "api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Form data was successfully sent to the server
        // You can perform additional actions if needed
        console.log("Data submitted successfully!");
      } else {
        // Handle the response in case of an error
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
    apiTestData();
  }
</script>

<main>
  <h1>Film List</h1>

  {#if films.length > 0}
    <p>
      {#each films as film}
        <div>
          <p>
            {film.id}: {film.name} - {film.description} <button>edit</button>
            <button>delete</button>
          </p>
        </div>
      {/each}
    </p>
  {:else}
    <p>Loading...</p>
  {/if}

  <!-- {#await apiTestData()}
    <p>...loading test</p>
  {:then}
    <p>
      {#each testData as data}
        <p>{data.name}: {data.value}</p>
      {/each}
    </p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await} -->

  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <label>
      Description:
      <textarea bind:value={description} />
    </label>
    <button type="submit">Submit</button>
  </form>
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

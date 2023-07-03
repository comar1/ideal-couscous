<script>
  let films = [];

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
  }

  fetchData();
</script>

<main>
  <h1>Film List</h1>

  {#if films.length > 0}
    <ul>
      {#each films as film}
        <li>{film.title}</li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}
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

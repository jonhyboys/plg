<script>
  export let options = [];
</script>

<nav>
  <ul>
    {#each options as item}
      <li>
        <a href={item.link}>{item.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    background-color: #333;
    padding: 1rem;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }

  li a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  li a:hover {
    text-decoration: underline;
  }
</style>

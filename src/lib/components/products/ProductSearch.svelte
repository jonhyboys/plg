<script>
  import ProductSearchItem from './ProductSearchItem.svelte';
  import { onMount } from 'svelte';
  import { deserialize } from '$app/forms';

  let searchText = '';
  let results = [];
  let timeout;
  let controller;
  let mostrarResultados = false;

  async function search(event) {
    let formData;
    if (event){
        event.preventDefault();
        formData = new FormData(event.target);
    }
    else {
        formData = new FormData();
        formData.append('text', searchText);
    }
    if (searchText.length < 3) return;

    if (controller) controller.abort();
    controller = new AbortController();

    
    const response = await fetch('?/search', {
        method: 'POST',
        body: formData,
        headers: {
            'x-sveltekit-action': 'true'
        },
        signal: controller.signal
    });

    const result = deserialize(await response.text());
    if(result.data.success) {
        results = result.data.results.slice(0, 10);
        mostrarResultados = true;
    } else {
        if(result.data.error !== 'AbortError') {
            console.error('Error al buscar productos:', result.data.error);
            results = [];
            mostrarResultados = true;
        }
    }
  }

  function manejarInput(e) {
    searchText = e.target.value;

    if (/^\d{12,13}$/.test(searchText)) {
      search();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (searchText.length >= 3) search();
      }, 500);
    }
  }
  
    function manejarFocus(event) {
        event.target.select();

        // Solo mostrar resultados si ya existen
        if (results.length > 0) {
            mostrarResultados = true;
        }
    }

  onMount(() => {
    window.addEventListener('add-sale-item', () => {
      mostrarResultados = false;
    });

    window.addEventListener('product-deleted', () => {
      results = [];
      mostrarResultados = false;
    });
  });
</script>

<div class="product-search">
  <form onsubmit={search}>
    <div>
        <input type="text" name="text" bind:value={searchText} oninput={manejarInput} onfocus={manejarFocus} />
        <button type="submit">Buscar</button>
    </div>
  </form>
  {#if mostrarResultados}
    <ul>
      {#if results.length > 0}
        {#each results as product}
          <ProductSearchItem {product} />
        {/each}
      {:else if searchText.length >= 3}
        <li>Sin resultados</li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .product-search {
    margin-bottom: 1rem;
    width: 100%;
  }

  .product-search form div {
    display: flex;
  }

  .product-search input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
  }

  .product-search button {
    background: #22c55e; /* green-500 */
    border-radius: 0 4px 4px 0;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>
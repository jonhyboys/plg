<script lang="ts">
  import ProductNew from '$lib/components/products/ProductNew.svelte';
  import ProductSearch from '$lib/components/products/ProductSearch.svelte';

  let creatingProduct = false;

  function handleShowProductNew() {
    creatingProduct = true;
  }

  import { onMount } from 'svelte';
  onMount(() => {
    window.addEventListener('show-product-new', handleShowProductNew);

    return () => {
      window.removeEventListener('show-product-new', handleShowProductNew);
    };
  });
</script>

<h1>
    Productos 
    <button on:click={() => window.dispatchEvent(new CustomEvent('show-product-new'))}>
        Nuevo
    </button>
</h1>
<ProductSearch />
{#if creatingProduct}
    <ProductNew on:close={() => creatingProduct = false} />
{/if}
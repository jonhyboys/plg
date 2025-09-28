<script lang="ts">
  import ProductEdit from '$lib/components/products/ProductEdit.svelte';
  import ProductNew from '$lib/components/products/ProductNew.svelte';
  import ProductSearch from '$lib/components/products/ProductSearch.svelte';
  import { onMount } from 'svelte';

  let creatingProduct = false;
  let selectedProduct: any = null;

  function handleShowProductNew() {
    creatingProduct = true;
  }

  function handleShowProductDetail(e: CustomEvent) {
    selectedProduct = e.detail.product;
  }

  onMount(() => {
    window.addEventListener('show-product-new', handleShowProductNew);
    window.addEventListener('show-product-detail', handleShowProductDetail);

    return () => {
      window.removeEventListener('show-product-new', handleShowProductNew);
      window.removeEventListener('show-product-detail', handleShowProductDetail);
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
{#if selectedProduct}
  <ProductEdit product={selectedProduct} on:close={() => selectedProduct = null} />
{/if}
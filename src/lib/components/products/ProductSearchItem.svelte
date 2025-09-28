<script>
    import { deserialize } from "$app/forms";

    export let product;

    function showDetail() {
        window.dispatchEvent(new CustomEvent('show-product-detail', {
            detail: { product }
        }));
    }

    async function deleteProduct(event) {
        const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`);
        if (!confirmacion) return;

        let formData = new FormData();
        formData.append('id', product.id);
        const response = await fetch('?/delete', {
            method: 'POST',        
            body: formData,
            headers: {
                'x-sveltekit-action': 'true'
            }
        });

        const result = deserialize(await response.text());
        if(result.type === 'success' && result.data.success) {
                alert('Producto eliminado.');
                window.dispatchEvent(new CustomEvent('product-deleted', {
                    detail: { id: product.id }
                }));
                return;
        }
        else {
            console.log('Error al eliminar producto:', result.data.error);
            alert('Error al eliminar el producto: ' + result.data.error);
            return;  
        }    
    }
</script>

<li>
    <div>
        <p><strong>{product.name}</strong> (ID: {product.id})</p>
        <p>Código de barras: {product.barcode || 'N/A'}</p>
        <p>Precio: ${product.price.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
    </div>
    <div class="actions">
        <button onclick={showDetail}>Ver Detalle</button>
        <button onclick={deleteProduct}>Eliminar</button>
    </div>
</li>

<style>
  li {
    align-items: center;
    border-bottom: 1px solid #ccc;
    display: flex;
    font-size: .9em;
    justify-content: space-between;
    list-style: none;
    padding: 0.5em;
  }

  li:hover {
    background-color: #f0f0f0;
  }

  li > div:first-child {
    display: flex;
    flex: 1;
  }

  p {
    margin: 0 1em 0.25em 0;
  }

  .actions {
    align-items: center;
    display: flex;
    gap: 1em;
    justify-content: space-between;
  }

  button {
    padding: 4px 8px;
    background-color: #22c55e; /* green-500 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #16a34a; /* green-600 */
  }

  button:nth-child(2) {
    background-color: #ef4444; /* red-500 */
  }

  button:nth-child(2):hover {
    background-color: #dc2626; /* red-600 */
  }
</style>

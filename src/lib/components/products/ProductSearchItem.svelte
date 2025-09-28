<script>
  export let product;

  function mostrarDetalle() {
    window.dispatchEvent(new CustomEvent('show-product-detail', {
      detail: { product }
    }));
  }

  async function eliminarProducto() {
    const confirmacion = confirm(`¿Estás seguro de que deseas marcar como eliminado el producto "${product.name}"?`);
    if (!confirmacion) return;

    const productoEliminado = { ...product, deleted: true };

    try {
      const API_URL = window.location.hostname === 'localhost'
        ? '/http://localhost:3000/api'
        : import.meta.env.VITE_API_URL
      const res = await fetch(`${API_URL}/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEliminado)
      });

      if (!res.ok) {
        throw new Error('Error al marcar el producto como eliminado.');
      }

      alert('Producto marcado como eliminado.');
      window.dispatchEvent(new CustomEvent('product-deleted', {
        detail: { id: product.id }
      }));
    } catch (e) {
      alert(e.message);
    }
  }
</script>

<li>
  <div>
    <p>
      <strong>{product.name}</strong> | <em>{product.trade}</em> | {product.code}
    </p>
    <p>Precio: {product.price} | Costo: {product.cost} | Stock: {product.stock}</p>
  </div>
  <div class="actions">
    <button on:click|stopPropagation={mostrarDetalle}>Editar</button>
    <button on:click|stopPropagation={eliminarProducto}>Eliminar</button>
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

  p {
    margin: 0 0 0.25em 0;
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

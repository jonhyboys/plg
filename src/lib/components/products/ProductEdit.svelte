<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { deserialize } from '$app/forms';
  
  const dispatch = createEventDispatcher();

  export let product;

  let editable = false;
  let form = { ...product };
  let original = { ...product };
  let error = '';

  function edit() {
    editable = true;
    error = '';
  }

  function cancel() {
    form = { ...original };
    editable = false;
    error = '';
  }

  async function save(event) {
    event.preventDefault();
    error = '';
    
    if (
      !form.name || !form.trade || !form.description ||
      form.cost <= 0 || form.price <= 0 || form.stock < 0
    ) {
      error = 'Por favor, completa todos los campos correctamente.';
      return;
    }
    const formData = new FormData(event.target);
    const response = await fetch(`?/edit`, {
      method: 'POST',
      body: formData,
      headers: {
        'x-sveltekit-action': 'true'
      }
    });
    const result = deserialize(await response.text());
    if(result.type === 'success' && result.data.success) {
        alert('Producto actualizado exitosamente.');        
        original = { ...form };
        editable = false;
    } else {
        alert('Error: ' + result.data.error);
    }
  }
</script>

<section>
    <div id="product-new">
        <div class="close" onclick={cancel}>X</div>
        <h2>Editar producto</h2>
        <form method="POST" onsubmit={save}>
            <input type="hidden" name="id" value={form.id} />
            <div class="form-grid">
                <div class="form-control">
                    <label>ID:</label>
                    <input type="number" bind:value={form.id} readonly />
                </div>
                <div class="form-control">
                    <label for="name">Nombre</label>
                    <input name="name" type="text" bind:value={form.name} disabled={!editable} />
                </div>
                <div class="form-control">
                    <label for="trade">Marca</label>
                    <input name="trade" type="text" bind:value={form.trade} disabled={!editable} />
                </div>
                <div class="form-control full-width">
                    <label for="description">Descripción</label>
                    <textarea name="description" bind:value={form.description} disabled={!editable}></textarea>
                </div>
                <div class="form-control">
                    <label for="cost">Costo</label>
                    <input name="cost" type="number" min="0" step="0.01"  bind:value={form.cost} disabled={!editable} />
                </div>
                <div class="form-control">
                    <label for="price">Precio</label>
                    <input name="price" type="number" min="0" step="0.01" bind:value={form.price} disabled={!editable} />
                </div>
                <div class="form-control">
                    <label for="stock">Stock</label>
                    <input name="stock" type="number" min="0" step="1" bind:value={form.stock} disabled={!editable} />
                </div>
                <div class="form-control">
                    <label for="code">Código</label>
                    <input name="code" type="text" bind:value={form.code} disabled={!editable} />
                </div>
            </div>
            <div class="buttons">
            {#if editable}
                <button type="submit">Guardar</button>
                <button onclick={cancel}>Cancelar</button>
            {:else}
                <button onclick={edit}>Editar</button>
            {/if}
            </div>
        </form>
    </div>
</section>

<style>
    section {
        display: flex;
        justify-content: center;
    }

    #product-new {
        background: #FAFAFA;
        border: 1px solid #CCC;
        border-radius: 8px;
        margin: 2em 0;
        padding: 2em;
        position: relative;
        width: 90%;
        max-width: 600px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .close {
        cursor: pointer;
        font-size: 1.2em;
        font-weight: bold;
        position: absolute;
        right: .8em;
        top: .8em;
    }

    .form-grid {
        display: grid;
        gap: 0.5em;
        grid-template-columns: 1fr 1fr;
    }

    .form-control {
        display: flex;
        flex-direction: column;
    }

    .full-width { grid-column: 1 / -1; }

    .buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    button {
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    .error {
        color: red;
        margin-top: 0.5rem;
    }

    .success {
        color: green;
        margin-top: 0.5rem;
    }
</style>
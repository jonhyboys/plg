<script>
    import { deserialize } from "$app/forms";

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('?/create', {
            method: 'POST',
            body: formData,
            headers: {
                'x-sveltekit-action': 'true'
            }
        });
        const result = deserialize(await response.text());
        if(result.data.success) {
            alert('Producto creado exitosamente.');
            window.location.href = '/products';
        } else {
            alert('Error: ' + result.data.error);
        }
    }
</script>

<section>
    <div id="product-new">
        <div class="close" onclick={cancelar}>X</div>
        <h2>Nuevo producto</h2>
        <form method="POST" onsubmit={handleSubmit}>
            <div class="form-grid">
                <div class="form-control">
                    <label for="name">Nombre</label>
                    <input name="name" type="text" />
                </div>
                <div class="form-control">
                    <label for="trade">Marca</label>
                    <input name="trade" type="text" />
                </div>
                <div class="form-control full-width">
                    <label for="description">Descripción</label>
                    <textarea name="description"></textarea>
                </div>
                <div class="form-control">
                    <label for="cost">Costo</label>
                    <input name="cost" type="number" min="0" step="0.01" />
                </div>
                <div class="form-control">
                    <label for="price">Precio</label>
                    <input name="price" type="number" min="0" step="0.01" />
                </div>
                <div class="form-control">
                    <label for="stock">Stock</label>
                    <input name="stock" type="number" min="0" step="1" />
                </div>
                <div class="form-control">
                    <label for="code">Código (opcional)</label>
                    <input name="code" type="text" />
                </div>
            </div>
            <div class="buttons">
                <button type="submit">Guardar</button>
                <button type="reset">Cancelar</button>
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
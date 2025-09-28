import fs from 'fs';

const filePath = 'src/lib/data/products.json';
const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function readData() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function validateProduct(newProduct, products) {
  if (!newProduct.name || newProduct.name.trim() === '') {
    return { valid: false, error: 'El nombre no puede ser vacío.' };
  }
  if (typeof newProduct.price !== 'number' || newProduct.price <= 0) {
    return { valid: false, error: 'El precio debe ser mayor que cero.' };
  }
  if (typeof newProduct.cost !== 'number' || newProduct.cost <= 0) {
    return { valid: false, error: 'El costo debe ser mayor que cero.' };
  }
  return { valid: true };
}

function validateNewProduct(newProduct, products) {
  if (products.some(p => p.code === newProduct.code)) {
    return { valid: false, error: 'Ya existe un producto con ese código.' };
  }
  return validateProduct(newProduct, products);
}

function create(newProduct) {
  const products = readData();
  const validation = validateNewProduct(newProduct, products);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  newProduct.id = nextId;

  products.push(newProduct);
  writeData(products);
  return { success: true, product: newProduct };
}

function search(text) {
    const products = readData();
    if (!text || text.trim() === '') return [];
    const terms = removeAccents(text.toLowerCase()).split(/\s+/);
    return products.filter(p => {
        if (p.deleted) return false;

        const name = removeAccents((p.name || '').toLowerCase());
        const code = removeAccents((p.code || '').toLowerCase());

        return terms.every(term =>
        name.includes(term) || code.includes(term)
        );
    });
}

function update(productToUpdate) {
    const products = readData();
    const index = products.findIndex(p => p.id === productToUpdate.id);

    if (index !== -1) {
        if (productToUpdate.deleted === true) {
            products[index].deleted = true;
            writeData(products);
            return {success: true, product: products[index]};
        }

        const validation = validateProduct(productToUpdate, products);
        if (validation.valid) {
            products[index] = productToUpdate;
            writeData(products);
            return {success: true, product: products[index]};
        } else {
            return {success: false, error: validation.error};
        }
    } else {
        return {success: false, error: 'Producto no encontrado.'};
    }
}

export default { create, search, update };
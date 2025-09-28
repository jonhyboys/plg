import db from '$lib/data/products.js';
import { fail } from '@sveltejs/kit';

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const newProduct = {
            name: formData.get('name'),
            trade: formData.get('trade'),
            description: formData.get('description'),
            cost: parseFloat(formData.get('cost')),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock'), 10) || 0,
            code: formData.get('code')
        };
        const result = db.create(newProduct);
        if (result.success) {
            return { success: true, product: result.product };
        } else {
            return fail(400, {error: result.error});
        }
    }
};
// src/features/products/api.ts
export interface Product {
    id: string
    name: string
    price: number
}

export const fetchProducts = async (): Promise<Product[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: '1', name: 'Shoes', price: 59.99 },
                { id: '2', name: 'Hat', price: 19.99 },
                { id: '3', name: 'Bag', price: 89.99 },
            ])
        }, 500)
    })
}

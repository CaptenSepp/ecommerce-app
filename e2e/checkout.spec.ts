import { expect, test } from '@playwright/test' // Playwright helpers

test('browse products, add to cart, and submit checkout', async ({ page }) => {
  await page.route('**/products/categories', async (route) => { // mock categories endpoint
    await route.fulfill({ json: ['beauty'] }) // stable category list
  })
  await page.route('**/products', async (route) => { // mock products endpoint
    await route.fulfill({
      json: {
        products: [
          {
            id: 1,
            title: 'E2E Product',
            description: 'E2E description',
            price: 20,
            discountPercentage: 0,
            rating: 4.5,
            stock: 10,
            brand: 'E2E Brand',
            category: 'beauty',
            thumbnail: '',
            images: [],
          },
        ],
      },
    }) // stable product list
  })

  await page.goto('/products') // open products page
  await page.getByRole('button', { name: /^add$/i }).click() // add product to cart
  await page.getByLabel('Open cart').click() // navigate to cart
  await page.getByRole('button', { name: /check out/i }).click() // proceed to checkout
  await page.getByLabel('Full name').fill('Jane Doe') // fill name
  await page.getByLabel('Email').fill('jane@example.com') // fill email
  await page.getByLabel('Address').fill('123 Main Street') // fill address
  await page.getByRole('button', { name: /place order/i }).click() // submit form
  await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible() // confirmation visible
})

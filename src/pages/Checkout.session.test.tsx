import { beforeEach, describe, expect, it, vi } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createOrder } from "@/features/orders/services"
import { CUSTOMER_STORAGE_KEY } from "@/pages/checkout/checkout-tools"
import { buildItem, renderCheckoutWithStore } from "./test-tools/checkout-test-tools"

const navigateMock = vi.fn() // capture navigation calls

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return { ...actual, useNavigate: () => navigateMock } // replace navigation only
})

vi.mock("@/features/orders/services", () => ({
  createOrder: vi.fn(), // mock order creation
}))

beforeEach(() => {
  navigateMock.mockClear()
  vi.mocked(createOrder).mockReset()
  window.sessionStorage.clear() // keep tests isolated
})

describe("Checkout session customer data", () => {
  it("prefills the form from sessionStorage", () => {
    window.sessionStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify({ name: "Ada Lovelace", email: "ada@example.com", address: "123 Long Street" }))
    renderCheckoutWithStore([buildItem()])
    expect(screen.getByLabelText("Full name")).toHaveValue("Ada Lovelace")
    expect(screen.getByLabelText("Email")).toHaveValue("ada@example.com")
    expect(screen.getByLabelText("Address")).toHaveValue("123 Long Street")
  })

  it("saves customer data to sessionStorage after a successful order", async () => {
    const user = userEvent.setup()
    vi.mocked(createOrder).mockResolvedValueOnce({ id: "order_123", createdAt: new Date().toISOString(), customer: { name: "Ada Lovelace", email: "ada@example.com", address: "123 Long Street" }, items: [{ id: 202, title: "Checkout Item", price: 20, quantity: 1 }], totals: { subtotal: 20, shipping: 4.99, total: 24.99 } })
    renderCheckoutWithStore([buildItem()])
    await user.type(screen.getByLabelText("Full name"), "Ada Lovelace")
    await user.type(screen.getByLabelText("Email"), "ADA@example.com")
    await user.type(screen.getByLabelText("Address"), "123 Long Street")
    await user.click(screen.getByRole("button", { name: /place order/i }))
    await waitFor(() => expect(window.sessionStorage.getItem(CUSTOMER_STORAGE_KEY)).toBeTruthy())
    expect(JSON.parse(window.sessionStorage.getItem(CUSTOMER_STORAGE_KEY) ?? "{}")).toEqual({ name: "Ada Lovelace", email: "ada@example.com", address: "123 Long Street" })
  })
})

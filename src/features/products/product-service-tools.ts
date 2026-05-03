import { z } from "zod"

export const strictProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
}) // strict schema for warnings

export const productSchema = z.object({
  id: z.number(),
  title: z.string().catch("Untitled product"),
  description: z.string().catch(""),
  price: z.number().catch(0),
  discountPercentage: z.number().catch(0),
  rating: z.number().catch(0),
  stock: z.number().catch(0),
  brand: z.string().catch("Unknown brand"),
  category: z.string().catch("uncategorized"),
  thumbnail: z.string().catch(""),
  images: z.array(z.string()).catch([]),
}) // tolerant schema for runtime use

export const productsResponseSchema = z.object({
  products: z.array(z.unknown()),
}) // products endpoint shape

export const categoriesResponseSchema = z.array(z.string()) // categories endpoint shape

export const formatCategoryLabel = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") // simple slug to label formatter

import {z} from "zod"

const productSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    price: z.string().min(1, {message: "Price is required"}),
    contact: z.string().min(1, {message: "Contact is required"}),
    description: z.string().min(1, {message: "Description is required"}),
    category: z.string().min(1, {message: "Category is required"}),
})

type ProductSchema = z.infer<typeof productSchema>

export {productSchema, type ProductSchema}
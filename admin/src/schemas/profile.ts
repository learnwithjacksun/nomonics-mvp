import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
 
})

type ProfileSchema = z.infer<typeof profileSchema>;

export { profileSchema, type ProfileSchema };
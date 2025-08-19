import { z } from "zod";


const bankDataFormSchema = z.object({
    accountNumber: z.string().min(1, { message: "Account number is required" }),
    bankCode: z.string().min(1, { message: "Bank code is required" }),
    isDefault: z.boolean().optional(),
});

export type BankDataFormSchema = z.infer<typeof bankDataFormSchema>;

export { bankDataFormSchema };
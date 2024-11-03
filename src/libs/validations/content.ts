import { z } from "zod";

export const topupSchema = z.object({
    top_up_amount: z.number().min(10000,'Minimal transaksi Rp 10.000').max(1000000,'Maksimal transaksi Rp 1.000.000')
})

export const profileSchema = z.object({
    first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
    last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
})

export type TopupSchema = z.infer<typeof topupSchema>;

export type ProfileSchema = z.infer<typeof profileSchema>;
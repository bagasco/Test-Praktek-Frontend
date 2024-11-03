import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
    last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    confirm_password: z.string().min(1, "Konfirmasi password tidak boleh kosong"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
})

export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;
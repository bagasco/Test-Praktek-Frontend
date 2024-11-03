"use server";

import { cookies } from "next/headers";
import { privateReq, publicReq } from "../axios";
import { LoginSchema, loginSchema, registerSchema, RegisterSchema } from "../validations/auth";
import { redirect } from "next/navigation";

export async function register(params: RegisterSchema) {
    const validation = registerSchema.safeParse(params);
    
    if (!validation.success) {
        return {
            error: "Data tidak valid!"
        }
    }

    try {
        const req = await publicReq.post('/registration',validation.data)

        return {
            message: req.data.message
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function login(params: LoginSchema) {
    const validation = loginSchema.safeParse(params);
    
    if (!validation.success) {
        return {
            error: "Data tidak valid!"
        }
    }

    try {
        const req = await publicReq.post('/login',validation.data);
        (await cookies()).set('token', req.data.data.token, {
            httpOnly: true, // Mencegah akses JavaScript ke cookie ini
            secure: process.env.NODE_ENV === 'production', // Hanya mengirim cookie melalui HTTPS di production
            sameSite: 'strict', // Mencegah cookie dikirim dalam permintaan lintas situs
            path: '/', // Memastikan cookie tersedia di seluruh aplikasi
            maxAge: 60 * 60 * 12,
        });
        return {
            message: req.data.message,
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function getProfile() {
    const token = await getToken();

    if (!token) {
        return null;
    }

    try {
        const req = await privateReq(token.value).get('/profile');
        return req.data.data;
    } catch (error) {
        return null;
    }
}

export async function getToken() {
    const token = (await cookies()).get('token');
    return token;
}

export async function logout() {
    (await cookies()).delete('token');
    return redirect('/login');
}
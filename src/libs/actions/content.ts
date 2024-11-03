"use server";

import { privateReq } from "../axios";
import { ServiceType } from "../types";
import { profileSchema, ProfileSchema, topupSchema, TopupSchema } from "../validations/content";
import { getProfile, getToken } from "./auth";

export async function getHomePageData() {
    const token = await getToken();

    if (!token) {
        return null;
    }

    try {
        const [profile,banner,services,balance] = await Promise.all([
            getProfile(),
            privateReq(token.value).get('/banner'),
            privateReq(token.value).get('/services'),
            privateReq(token.value).get('/balance'),
        ])
    
        return {
            profile,
            banner: banner.data.data,
            services: services.data.data,
            balance: balance.data.data.balance
        };
    } catch (error) {
        return null;
    }
}

export async function getTransactionPageData() {
    const token = await getToken();

    if (!token) {
        return null;
    }

    try {
        const [profile,balance] = await Promise.all([
            getProfile(),
            privateReq(token.value).get('/balance'),
        ])
    
        return {
            profile,
            balance: balance.data.data.balance
        };
    } catch (error) {
        return null;        
    }
}

export async function getTransactionData(code: string) {
    const token = await getToken();

    if (!token) {
        return null;
    }

    try {
        const req = await privateReq(token.value).get("/services");

        return req.data.data.find((d: ServiceType) => d.service_code === code);
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function topup(params: TopupSchema) {
    const token = await getToken();

    if (!token) {
        return {
            error: 'Sesi telah berakhir, silakan masuk kembali.'
        };
    }

    const validation = topupSchema.safeParse(params);

    if (!validation) {
        return {
            error: 'Data tidak valid!'
        }
    }

    try {
        const req = await privateReq(token.value).post('/topup',validation.data);
        return {
            message: req.data.message
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function getTransactionHistoryData({
    offset,
    limit
}: {
    offset: number,
    limit: number
}) {
    const token = await getToken();

    if (!token) {
        return {
            error: 'Sesi telah berakhir, silakan masuk kembali.'
        };
    }

    try {
        const req = await privateReq(token.value).get(`/transaction/history?offset=${offset}&limit=${limit}`);

        return req.data.data;
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function transaction(code: string) {
    const token = await getToken();

    if (!token) {
        return {
            error: 'Sesi telah berakhir, silakan masuk kembali.'
        };
    }

    try {
        const req = await privateReq(token.value).post('/transaction',{ service_code: code });
        return {
            message: req.data.message
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function updateProfile(params: ProfileSchema) {
    const token = await getToken();

    if (!token) {
        return {
            error: 'Sesi telah berakhir, silakan masuk kembali.'
        };
    }

    const validation = profileSchema.safeParse(params);

    if (!validation.success) {
        return {
            error: 'Data tidak valid!'
        }
    }

    try {
        const req = await privateReq(token.value).put('/profile/update',validation.data);
        return {
            message: req.data.message,
        };
    } catch (error: any) {
        return {
            error: error.response.data.message
        }
    }
}

export async function updateAvatar(file: File) {
    const token = await getToken();

    if (!token) {
        return {
            error: 'Sesi telah berakhir, silakan masuk kembali.'
        };
    }

    try {
        const formData = new FormData();
        formData.append("file", file);

        const req = await privateReq(token.value).put('/profile/image', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return {
            message: req.data.message,
        };
    } catch (error: any) {
        return {
            error: "Terjadi kesalahan pada server."
        }
    }
}
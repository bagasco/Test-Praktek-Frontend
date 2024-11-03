import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function parseCurrency(amount: number) {
    return amount.toLocaleString("id-ID");
}

export function formatDate(date: string): string {
    // Konversi string ke objek Date
    const parsedDate = new Date(date);
    
    // Periksa apakah parsing berhasil
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    };

    // Format tanggal
    const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(parsedDate);

    // Tambahkan 'WIB' secara manual
    return `${formattedDate} WIB`;
}

export function checkAvatar(url: string) {
    if (url.split('/').pop() === 'null') return null;
    return url;
}
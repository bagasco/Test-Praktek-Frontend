import { buttonVariants } from "@/components/button"
import Logo from "@/components/logo"
import { getProfile } from "@/libs/actions/auth"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Not found"
}

export default async function NotFoundPage() {
    const profile = await getProfile();
    return (
        <div className="h-dvh flex flex-col items-center justify-center gap-4 container">
            <Logo size="lg"/>
            <h1 className="font-semibold text-2xl text-center">Halaman tidak ditemukan</h1>
            <p className="text-muted text-sm text-center">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
            <Link 
                href={profile ? '/' : '/login'}
                className={buttonVariants({ variant: 'outline' })}
            >
                Kembali ke halaman {profile ? 'beranda' : 'login'}
            </Link>
        </div>
    )
}
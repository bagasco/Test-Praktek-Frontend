import Logo from "@/components/logo";
import Link from "./link";

export default function Header() {
    return (
        <header className="flex items-center justify-between py-5">
            <Link href={'/'}>
                <Logo/>
            </Link>
            <div className="space-x-4 sm:space-x-8">
                <Link href={'/topup'}>Top Up</Link>
                <Link href={'/transaksi'}>Transaksi</Link>
                <Link href={'/akun'}>Akun</Link>
            </div>
        </header>
    )
}
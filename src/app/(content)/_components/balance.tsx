"use client";

import Icon from "@/components/icon";
import { checkAvatar, parseCurrency } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
    balance: number,
    fullName: string,
    avatar: string
}

export default function Balance({ balance, fullName, avatar }: Props) {
    const [show,setShow] = useState(false);
    return (
        <section className="flex lg:items-center lg:justify-between py-6 max-lg:flex-col max-lg:gap-4">
            <div>
                <Image 
                    width={40}
                    height={40}
                    alt="Profile Photo"
                    src={!checkAvatar(avatar) ? '/assets/profile_poto.png' : avatar}
                    className="rounded-full"
                />
                <div className="mt-4">
                    <h3 className="text-muted">Selamat datang,</h3>
                    <h1 title={fullName} className="md:text-xl font-semibold lg:max-w-72 truncate">{fullName}</h1>
                </div>
            </div>
            <div className="lg:max-w-[620px] w-full relative rounded-xl overflow-hidden">
                <div className="space-y-2 relative z-10 p-5 w-max bg-[#F13A2F]">
                    <p className="text-sm text-muted-foreground">Saldo anda</p>
                    <h1 className="text-white font-semibold text-xl md:text-2xl">Rp {show ? parseCurrency(balance) : '• • • • •'}</h1>
                    <button onClick={() => setShow(!show)} className="text-sm flex items-center gap-2 text-muted-foreground">
                        <span>{show ? 'Tutup' : 'Lihat'} Saldo</span>
                        <Icon name={show ? 'eye-slash' : 'eye'}/>
                    </button>
                </div>
                <Image 
                    alt="Balance Background" 
                    src={'/assets/background_saldo.png'} 
                    fill
                    className="select-none object-cover object-center"
                />
            </div>
        </section>
    )
}
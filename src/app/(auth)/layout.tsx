import { getProfile } from "@/libs/actions/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
    const profile = await getProfile();
    if (profile) redirect('/');
    return (
        <section className="flex min-h-dvh">
            <div className="flex-1 max-h-dvh overflow-auto">
                {children}
            </div>
            <div className="relative flex-1 max-lg:hidden">
                <Image 
                    fill
                    alt="Ilustrasi Register" 
                    src={'/assets/illustrasi_login.png'}
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
        </section>
    )
}
import { getTransactionData } from "@/libs/actions/content";
import { notFound } from "next/navigation";
import TransactionForm from "./_components/form";
import Image from "next/image";
import { Metadata } from "next";

interface Props {
    params: Promise<{ code: string }>
}

export const metadata: Metadata = {
    title: "Pembelian"
}

export default async function PembelianPage({ params }: Props) {
    const code = (await params).code;
    const data = await getTransactionData(code.toUpperCase());

    if (!data) return notFound();

    return (
        <section className="py-6">
            <div className="mb-10">
                <p className="text-sm text-muted">Pembayaran</p>
                <div className="flex items-center gap-2 mt-2">
                    <Image
                        width={30}
                        height={30}
                        src={data.service_icon}
                        alt={data.service_name}
                    />
                    <h1 className="font-semibold md:text-lg">{data.service_name}</h1>
                </div>
            </div>
            <TransactionForm data={data}/>
        </section>
    )
}
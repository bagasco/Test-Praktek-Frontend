import { getTransactionHistoryData } from "@/libs/actions/content";
import Container from "./_components/container";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LIMIT_RESPONSE } from "@/libs/constants";

export const metadata: Metadata = {
    title: "Transaksi"
}

export default async function TransactionPage() {
    const data = await getTransactionHistoryData({ offset: 0, limit: LIMIT_RESPONSE });

    if (data.error) return notFound();

    return (
        <section className="py-6">
            <p>Semua Transaksi</p>
            <Container data={data}/>
        </section>
    )
}
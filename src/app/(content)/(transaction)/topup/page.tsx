import { Metadata } from "next";
import TopupForm from "./_components/form";

export const metadata: Metadata = {
    title: "Top Up"
}

export default function TopupPage() {
    return (
        <section className="py-6">
            <div className="mb-10">
                <p className="text-sm text-muted">Silahkan masukkan</p>
                <h1 className="font-semibold text-lg md:text-xl mt-2">Nominal Top Up</h1>
            </div>
            <TopupForm/>
        </section>
    )
}
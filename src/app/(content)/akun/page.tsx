import { getProfile } from "@/libs/actions/auth";
import Form from "./_components/form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Akun"
}

export default async function AccountPage() {
    const data = await getProfile();

    if (!data) redirect('/login');

    return (
        <Form data={data}/>
    )
}
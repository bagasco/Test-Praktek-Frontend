import { Metadata } from "next";
import RegisterForm from "./_components/form";

export const metadata: Metadata = {
    title: "Registrasi"
}

export default function RegisterPage() {
    return <RegisterForm/>
}

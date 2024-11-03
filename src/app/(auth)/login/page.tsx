import { Metadata } from "next";
import LoginForm from "./_components/form";

export const metadata: Metadata = {
    title: "Login"
}

export default function LoginPage() {
    return <LoginForm/>
}

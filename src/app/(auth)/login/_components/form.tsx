"use client";

import { Message } from "@/components/notif";
import { login } from "@/libs/actions/auth";
import { loginSchema, LoginSchema } from "@/libs/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Form from "../../_components/form";
import Input from "@/components/input";
import Button from "@/components/button";

export default function LoginForm() {
    const { register: registerField, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    const [message, setMessage] = useState<Message | undefined>(undefined);
    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: LoginSchema) => {
        startTransition(async () => {
            const res = await login(data);

            if (res.error) {
                setMessage({
                    type: 'failed',
                    message: res.error
                });
            } else {
                setMessage({
                    type: 'success',
                    message: res.message
                });
                router.replace('/');
            }
        });
    };

    return (
        <Form
            message={message}
            onDeleteMessage={() => setMessage(undefined)}
            description="Masuk atau buat akun untuk memulai"
            form={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={isPending}>
                        <Input 
                            icon="email" 
                            placeholder="Masukkan email anda" 
                            {...registerField("email")} 
                            error={errors.email?.message} 
                        />
                        <Input 
                            icon="lock-closed" 
                            type="password" 
                            placeholder="Masukkan password anda" 
                            {...registerField("password")} 
                            error={errors.password?.message} 
                        />
                    </fieldset>
                    <Button isLoading={isPending} className="w-full mt-2" type="submit">
                        Login
                    </Button>
                </form>
            }
            navDescription="Belum punya akun? registrasi"
            navHref="/registrasi"
        />
    );
}
"use client";

import Input from "@/components/input";
import Form from "../../_components/form";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/libs/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/libs/actions/auth";
import { useState, useTransition } from "react";
import { Message } from "@/components/notif";

export default function RegisterForm() {
    const { register: refisterField, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const [message,setMessage] = useState<Message | undefined>(undefined);
    const [isPending, startTransition] = useTransition();

    const onSubmit = (data: RegisterSchema) => {
        startTransition(async () => {
            const res = await register(data);
    
            if (res.error) {
                setMessage({
                    type: 'failed',
                    message: res.error
                })
            }else {
                setMessage({
                    type: 'success',
                    message: res.message
                })
            }
        })
    };

    return (
        <Form
            message={message}
            onDeleteMessage={() => setMessage(undefined)}
            description="Lengkapi data untuk membuat akun"
            form={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={isPending}>
                        <Input 
                            icon="email" 
                            placeholder="Masukkan email anda" 
                            {...refisterField("email")} 
                            error={errors.email?.message} 
                        />
                        <Input 
                            icon="user" 
                            placeholder="Nama depan" 
                            {...refisterField("first_name")} 
                            error={errors.first_name?.message} 
                        />
                        <Input 
                            icon="user" 
                            placeholder="Nama belakang" 
                            {...refisterField("last_name")} 
                            error={errors.last_name?.message} 
                        />
                        <Input 
                            icon="lock-closed" 
                            type="password" 
                            placeholder="Buat password" 
                            {...refisterField("password")} 
                            error={errors.password?.message} 
                        />
                        <Input 
                            icon="lock-closed" 
                            type="password" 
                            placeholder="Konfirmasi password" 
                            {...refisterField("confirm_password")} 
                            error={errors.confirm_password?.message} 
                        />
                    </fieldset>
                    <Button isLoading={isPending} className="w-full mt-2" type="submit">Registrasi</Button>
                </form>
            }
            navDescription="sudah punya akun? login"
            navHref="/login"
        />
    );
}

"use client";

import Input from "@/components/input";
import Avatar from "./avatar";
import Button from "@/components/button";
import { ProfileType } from "@/libs/types";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileSchema } from "@/libs/validations/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { logout } from "@/libs/actions/auth";
import { updateProfile } from "@/libs/actions/content";
import Notif, { Message } from "@/components/notif";

interface Props {
    data: ProfileType
}

export default function Form({ data }: Props) {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: data.first_name,
            last_name: data.last_name
        }
    })
    const [editMode,setEditMode] = useState(false);
    const [isPending,startTransition] = useTransition();
    const [message,setMessage] = useState<Message | undefined>(undefined);
    const [fullName,setFullName] = useState(data.first_name + ' ' + data.last_name);

    const onSubmit = (data: ProfileSchema) => {
        startTransition(async () => {
            const res = await updateProfile(data);

            if (res.error) {
                setMessage({ type: 'failed', message: res.error });
            }else {
                const { first_name, last_name } = getValues();
                setFullName(first_name + ' ' + last_name);
                setEditMode(false);
                setMessage({ type: 'success', message: res.message });
            }
        })
    }
    return (
        <section className="max-w-2xl mx-auto py-12">
            <Avatar avatar={data.profile_image} fullName={fullName} setMessage={setMessage}/>
            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <Notif message={message} onDeleteMessage={() => setMessage(undefined)}/>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm">Email</label>
                    <Input 
                        icon="email" 
                        id="email" 
                        placeholder="Email"
                        value={data.email}
                        readOnly
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="first_name" className="text-sm">Nama depan</label>
                    <Input 
                        icon="user" 
                        id="first_name" 
                        placeholder="Nama depan"
                        {...register('first_name')}
                        error={errors.first_name?.message}
                        readOnly={!editMode || isPending}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="last_name" className="text-sm">Nama belakang</label>
                    <Input 
                        icon="user" 
                        id="last_name" 
                        placeholder="Nama belakang"
                        {...register('last_name')}
                        error={errors.last_name?.message}
                        readOnly={!editMode || isPending}
                    />
                </div>
                <div className="space-y-4">
                    <Button 
                        variant={'outline'} 
                        className="w-full"
                        type="button"
                        onClick={() => !isPending ? setEditMode(!editMode) : undefined}
                    >
                        {editMode ? "Batalkan" : "Edit profile"}
                    </Button>
                    <Button 
                        className="w-full"
                        type={editMode ? "submit" : "button"}
                        onClick={() => !editMode ? logout() : undefined}
                        isLoading={isPending}
                    >
                        {editMode ? "Simpan" : "Logout"}
                    </Button>
                </div>
            </form>
        </section>
    )
}
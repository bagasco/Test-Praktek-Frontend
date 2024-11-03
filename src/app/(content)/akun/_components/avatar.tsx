"use client";

import Icon from "@/components/icon";
import { Message } from "@/components/notif";
import Spinner from "@/components/spinner";
import { updateAvatar } from "@/libs/actions/content";
import { checkAvatar } from "@/libs/utils";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState, useTransition } from "react";

interface Props {
    fullName: string,
    avatar: string,
    setMessage: Dispatch<SetStateAction<Message | undefined>>
}

export default function Avatar({ fullName, setMessage, avatar }: Props) {
    const [isPending,startTransition] = useTransition();
    const [picture,setPicture] = useState(avatar);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        const MAX_FILE_SIZE = 100 * 1024; // 100 KB

        if (file) {
            if (file.type === "image/png" || file.type === "image/jpeg") {
                if (file.size <= MAX_FILE_SIZE) {
                    startTransition(async () => {
                        const res = await updateAvatar(file);
                        if (res.error) {
                            setMessage({ type: 'failed', message: res.error });
                        }else {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target?.result) {
                                    setPicture(e.target.result as string);
                                }
                            };
                            reader.readAsDataURL(file);
                            setMessage({ type: 'success', message: res.message });
                        }
                    })
                } else {
                    setMessage({ type: 'failed', message: 'Ukuran file harus kurang dari 100 KB.' })
                }
            } else {
                setMessage({ type: 'failed', message: 'Silakan pilih gambar dengan format PNG atau JPEG.' })
            }
        }

        event.target.value = "";
    };
    return (
        <div className="space-y-6">
            <label 
                htmlFor="picture" 
                className="block mx-auto relative w-max"
            >
                <Image
                    alt="Avatar"
                    src={!checkAvatar(picture) ? '/assets/profile_poto.png' : picture}
                    width={80}
                    height={80}
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-full"
                />
                <div className="border grid place-items-center absolute size-6 rounded-full bottom-0 right-0 bg-muted-foreground">
                    <Icon name="pencil" size={12}/>
                </div>
                {isPending && (
                    <div className="absolute inset-0 bg-black/30 grid place-items-center rounded-full">
                        <Spinner/>
                    </div>
                )}
            </label>
            <input 
                id="picture"
                type="file" 
                accept=".png, .jpeg" 
                hidden
                className="hidden"
                onChange={handleFileChange}
                disabled={isPending}
            />
            <h1 className="text-center font-semibold">{fullName}</h1>
        </div>
    )
}
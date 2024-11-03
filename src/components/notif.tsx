"use client";

import { cn } from "@/libs/utils";
import Icon from "./icon";

export type Message = {
    type: 'success' | 'failed',
    message: string
}

interface Props {
    message?: Message,
    onDeleteMessage?: () => void,
    className?: string
}

export default function Notif({ message, onDeleteMessage, className }: Props) {

    if (!message) return null;

    return (
        <div 
            className={cn(
                "mb-6 rounded p-2 flex justify-between items-center",
                {
                    "bg-red-100": message.type === 'failed',
                    "bg-green-100": message.type === 'success'
                },
                className
            )}
        >
            <p 
                className={cn(
                    "text-xs",
                    {
                        "text-red-500": message.type === 'failed',
                        "text-green-500": message.type === 'success'
                    }
                )}
            >
                {message.message}
            </p>
            <button 
                onClick={onDeleteMessage} 
                className={cn(
                    {
                        "text-red-500": message.type === 'failed',
                        "text-green-500": message.type === 'success'
                    }
                )}
            >
                <Icon name="x"/>
            </button>
        </div>
    )
}
import Logo from "@/components/logo";
import Notif, { Message } from "@/components/notif";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    description: string,
    form: ReactNode,
    navDescription: string,
    navHref: string,
    message?: Message,
    onDeleteMessage?: () => void
}

export default function Form({ 
    description, 
    form, 
    navDescription, 
    navHref, 
    message,
    onDeleteMessage
}: Props) {
    return (
        <div className="flex flex-col justify-center max-w-md mx-auto py-10 px-4 min-h-full">
            <Logo size="lg" className="mb-6 w-max mx-auto"/>
            <p className="text-2xl mx-auto max-w-xs text-center font-semibold mb-10">{description}</p>
            <Notif message={message} onDeleteMessage={onDeleteMessage}/>
            <div className="mb-6">
                {form}
            </div>
            <div className="space-x-1 mx-auto text-sm">
                <span className="text-muted">{navDescription}</span>
                <Link href={navHref} className="text-primary font-semibold">di sini</Link>
            </div>
        </div>
    )
}
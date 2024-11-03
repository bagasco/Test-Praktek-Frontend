"use client";

import { cn } from "@/libs/utils";
import Icon, { IconName } from "./icon";
import Button from "./button";
import { Dispatch, SetStateAction, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: IconName,
    error?: string
}

export default function Input({ type, ...props }: Props) {
    if (type === 'password') {
        const [showPW,setShowPW] = useState(false);
        return <Component type={type} showPW={showPW} setShowPW={setShowPW} {...props}/>
    }

    return <Component type={type} {...props}/>
}

interface ComponentProps extends Props{
    showPW?: boolean,
    setShowPW?: Dispatch<SetStateAction<boolean>>
}

function Component({ 
    className, 
    icon, 
    type, 
    error, 
    showPW = false, 
    setShowPW, 
    ...props 
}: ComponentProps) {
    return (
        <div className="relative pb-6">
            <div className="relative">
                <input 
                    className={cn(
                        "h-10 rounded border outline-none focus:border-primary w-full pl-9 py-1 placeholder:text-zinc-400 text-sm",
                        type === 'password' ? 'pr-9' : 'pr-3',
                        {
                            'border-red-500': error
                        },
                        className
                    )} 
                    type={showPW ? 'text' : type}
                    {...props}
                />
                <Icon 
                    name={icon} 
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 left-3",
                        error ? 'text-red-500' : 'text-zinc-400'
                    )}
                />
                {type === 'password' && (
                    <Button type="button" onClick={() => setShowPW!(!showPW)} size={'icon'} variant={'ghost'} className="absolute right-0.5 top-1/2 -translate-y-1/2 disabled:bg-transparent">
                        <Icon name={showPW ? 'eye-slash': 'eye'}/>
                    </Button>
                )}
            </div>
            {error && (
                <p className="right-0 bottom-1.5 text-xs text-red-500 absolute">{error}</p>
            )}
        </div>
    )
}
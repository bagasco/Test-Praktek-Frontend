"use client";

import { cn } from "@/libs/utils";
import Icon, { IconName } from "./icon";
import Button from "./button";
import { Dispatch, SetStateAction } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: IconName,
    error?: string,
    showPW?: boolean,
    setShowPW?: Dispatch<SetStateAction<boolean>>
}

export default function Input({ type, icon, error, className, showPW, setShowPW, ...props }: Props) {
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
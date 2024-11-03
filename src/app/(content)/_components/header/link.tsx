"use client";

import { cn } from "@/libs/utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof NextLink> {}

export default function Link({ children, className, href, ...props }: Props) {
    const pathname = usePathname();
    return (
        <NextLink
            className={cn(
                "text-xs sm:text-sm font-semibold",
                {
                    "text-primary": pathname === href
                },
                className
            )}
            href={href}
            {...props}
        >
            {children}
        </NextLink>
    )
}
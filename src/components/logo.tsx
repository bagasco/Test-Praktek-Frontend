import { cn } from "@/libs/utils";
import Image from "next/image";

interface Props {
    size?: 'default' | 'lg',
    className?: string
}

export default function Logo({ size = 'default', className }: Props) {
    const imageSize = size === 'lg' ? 30 : 20;
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Image
                width={imageSize}
                height={imageSize}
                alt="Logo"
                src={'/assets/logo.png'}
            />
            <span 
                className={`font-semibold ${size === 'lg' ? 'text-base' : 'text-sm'}`}
            >
                SIMS PPOB
            </span>
        </div>
    )
}
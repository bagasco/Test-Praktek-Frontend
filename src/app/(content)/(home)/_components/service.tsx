import Image from "next/image";
import Link from "next/link";

interface Props {
    src: string,
    name: string,
    code: string,
}

export default function Service({ name, src, code }: Props) {
    return (
        <Link href={`/pembelian/${code.toLowerCase()}`} className="basis-20">
            <Image alt={name} width={50} height={50} src={src} className="mx-auto"/>
            <p className="text-xs text-center">{name}</p>
        </Link>
    )
}
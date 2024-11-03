import Button, { buttonVariants } from "@/components/button";
import Icon from "@/components/icon";
import { cn } from "@/libs/utils";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
    open: boolean,
    onOpenChange: () => void,
    amount: string,
    success: string,
    error: string,
    onConfirm: () => void,
    isPending: boolean,
    type: 'topup' | 'transaction',
    transactionName?: string,
}

export default function Modal({ 
    open, 
    onOpenChange, 
    amount, 
    success, 
    error, 
    onConfirm,
    isPending,
    type,
    transactionName
}: Props) {
    return (
        <Dialog.Root open={open} onOpenChange={!isPending ? onOpenChange : undefined}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 z-50 fixed inset-0 transition opacity-0 data-[state=open]:opacity-100"/>
                <Dialog.Content className="fixed z-50 w-full h-max md:w-80 rounded p-5 pt-8 bg-white md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 left-0 bottom-0 max-md:rounded-t-xl">
                    <Dialog.Title hidden>Dialog</Dialog.Title>
                    <div 
                        className={cn(
                            "size-12 flex items-center justify-center mx-auto rounded-full text-white",
                            !success && !error ? "bg-primary" : success ? "bg-green-500" : "bg-red-500"
                        )}
                    >
                        <Icon 
                            name={!success && !error ? 'credit-card-solid' : success ? 'check' : 'x'} 
                            size={22}
                        />
                    </div>
                    <div className="mt-5">
                        <p className="text-center">
                            {type === 'topup' ? (
                                !success && !error ? "Anda yakin untuk Top Up sebesar" : "Top Up sebesar"
                            ) : (
                                !success && !error ? `Beli ${transactionName?.toLowerCase()} senilai` : `Pembayaran ${transactionName?.toLowerCase()} senilai`
                            )}
                        </p>
                        <h2 className="text-center font-semibold text-xl">
                            Rp{amount}{(!success && !error) && '?' }
                        </h2>
                    </div>
                    <div className="mt-5">
                        {!success && !error ? (
                            <Fragment>
                                <Button 
                                    isLoading={isPending}
                                    variant={'ghost'} 
                                    className="w-full text-primary font-semibold disabled:bg-transparent"
                                    onClick={onConfirm}
                                >
                                    Ya, lanjutkan {type === 'topup' ? 'Top Up' : 'Bayar'}
                                </Button>
                                <Dialog.Close asChild>
                                    <Button variant={'ghost'} className="w-full">Batalkan</Button>
                                </Dialog.Close>
                            </Fragment>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-center text-sm">{success ? "Berhasil" : "Gagal"}</p>
                                <Link href={'/'} className={buttonVariants({ variant: 'ghost', className: "w-full text-primary" })}>
                                    Kembali ke beranda
                                </Link>
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>            
        </Dialog.Root>
    )
}
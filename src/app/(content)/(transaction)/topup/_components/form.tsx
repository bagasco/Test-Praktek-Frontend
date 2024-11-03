"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { topupSchema, TopupSchema } from "@/libs/validations/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../_components/modal";
import { topup } from "@/libs/actions/content";
import { parseCurrency } from "@/libs/utils";

const amounts = [
    {
        value: 10000,
        label: 'Rp 10.000'
    },
    {
        value: 20000,
        label: 'Rp 20.000'
    },
    {
        value: 50000,
        label: 'Rp 50.000'
    },
    {
        value: 100000,
        label: 'Rp 100.000'
    },
    {
        value: 250000,
        label: 'Rp 250.000'
    },
    {
        value: 500000,
        label: 'Rp 500.000'
    },
]

export default function TopupForm() {
    const { handleSubmit, formState: { errors }, setValue, getValues } = useForm<TopupSchema>({
        resolver: zodResolver(topupSchema),
    });

    const [formattedAmount, setFormattedAmount] = useState("");
    const [transactionState,setTransactionState] = useState({
        showModal: false,
        success: '',
        error: ''
    });
    const [isPending, startTransition] = useTransition();

    const handleAmountChange = (rawValue: string) => {
        const value = rawValue || '0';
        const formatted = parseCurrency(parseInt(value, 10)); // Format dengan pemisah ribuan (ID lokal)
        
        setFormattedAmount(formatted);
        setValue("top_up_amount", parseInt(value, 10)); // Set nilai mentah ke form
    };

    const onSubmit = (data: TopupSchema) => {
        if (!transactionState.showModal) {
            setTransactionState(state => ({ ...state, showModal: true }));
        }else {
            startTransition(async () => {
                const res = await topup(data);
    
                if (res.error) {
                    setTransactionState(state => ({ ...state, error: res.error }));
                }else {
                    setTransactionState(state => ({ ...state, success: res.message }));
                }
            });
        }
    }
    return (
        <Fragment>
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-4">
                <div className="lg:col-span-2 lg:order-1 order-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                            icon="credit-card"
                            placeholder="masukkan nominal Top Up"
                            value={formattedAmount}
                            onChange={e => handleAmountChange(e.target.value.replace(/\D/g, ""))}
                            error={errors.top_up_amount?.message} 
                        />
                        <Button disabled={!getValues('top_up_amount')} className="w-full">Top Up</Button>
                    </form>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 order-1 lg:order-2">
                    {amounts.map((v,i) => (
                        <Button 
                            key={i} 
                            onClick={() => handleAmountChange(v.value.toString())}
                            variant={'outline'}
                            className="border-inherit text-muted hover:border-primary"
                        >
                            {v.label}
                        </Button>
                    ))}
                </div>
            </div>
            <Modal
                type="topup"
                isPending={isPending}
                onConfirm={() => onSubmit(getValues())}
                error={transactionState.error}
                success={transactionState.success}
                amount={formattedAmount}
                open={transactionState.showModal}
                onOpenChange={() => setTransactionState(state => ({ ...state, showModal: false }))}
            />
        </Fragment>
    )
}
"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { ServiceType } from "@/libs/types";
import { Fragment, useState, useTransition } from "react";
import Modal from "../../../_components/modal";
import { parseCurrency } from "@/libs/utils";
import { transaction } from "@/libs/actions/content";
import { useParams } from "next/navigation";

interface Props {
    data: ServiceType
}

export default function TransactionForm({ data }: Props) {
    const [transactionState,setTransactionState] = useState({
        showModal: false,
        success: '',
        error: ''
    });
    const [isPending, startTransition] = useTransition();
    const params = useParams();

    const handleSubmit = () => {
        startTransition(async () => {
            const res = await transaction((params.code as string).toUpperCase());

            if (res.error) {
                setTransactionState(state => ({ ...state, error: res.error }));
            }else {
                setTransactionState(state => ({ ...state, success: res.message }));
            }
        })
    }
    return (
        <Fragment>
            <section>
                <Input 
                    icon="credit-card"
                    placeholder="masukkan nominal Top Up"
                    value={parseCurrency(data.service_tariff)}
                    readOnly
                />
                <Button onClick={() => setTransactionState(state => ({ ...state, showModal: true }))} className="w-full">Bayar</Button>
            </section>
            <Modal
                type="transaction"
                transactionName={data.service_name}
                amount={parseCurrency(data.service_tariff)}
                open={transactionState.showModal}
                onOpenChange={() => setTransactionState(state => ({ ...state, showModal: false }))}
                error={transactionState.error}
                success={transactionState.success}
                isPending={isPending}
                onConfirm={handleSubmit}
            />
        </Fragment>
    )
}
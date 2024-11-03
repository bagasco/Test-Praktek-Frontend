"use client";

import { TransactionHistoryType } from "@/libs/types";
import { useState, useTransition } from "react";
import Transaction from "./transaction";
import Button from "@/components/button";
import { getTransactionHistoryData } from "@/libs/actions/content";
import { LIMIT_RESPONSE } from "@/libs/constants";

interface Props {
    data: {
        offset: string,
        limit: string,
        records: TransactionHistoryType[]
    }
}

export default function Container({ data }: Props) {
    const [state,setState] = useState(data);
    const [hasMore,setHasMore] = useState(data.records.length >= LIMIT_RESPONSE);
    const [isPending,startTransition] = useTransition();

    const handleLoadMore = () => {
        if (isPending) return;

        startTransition(async () => {
            const res = await getTransactionHistoryData({
                limit: LIMIT_RESPONSE,
                offset: parseInt(state.offset) + LIMIT_RESPONSE,
            })

            if (!res.error) {
                setHasMore(res.records.length >= LIMIT_RESPONSE);

                if (res.records.length) {
                    setState(state => ({
                        ...state,
                        records: [...state.records,...res.records],
                        offset: res.offset
                    }))
                }
            }
        })
    }
    return (
        <div className="mt-6 space-y-6">
            {state.records.map(((d,i) => (
                <Transaction key={i} data={d}/>
            )))}
            {hasMore && (
                <Button onClick={handleLoadMore} isLoading={isPending} variant={'ghost'} className="w-full text-primary disabled:bg-transparent">Show more</Button>                
            )}
        </div>
    )
}
import { TransactionHistoryType } from "@/libs/types"
import { cn, formatDate, parseCurrency } from "@/libs/utils"

interface Props {
    data: TransactionHistoryType
}

export default function Transaction({ data }: Props) {
    return (
        <div className="border rounded p-5 flex sm:items-center sm:justify-between max-sm:flex-col-reverse max-sm:gap-1.5">
            <div className="space-y-1.5">
                <h1 
                    className={cn(
                        "font-semibold",
                        data.transaction_type === 'TOPUP' ? "text-green-500" : "text-red-500"
                    )}
                >
                    {data.transaction_type==='TOPUP' ? '+' : '-'} Rp.{parseCurrency(data.total_amount)}
                </h1>
                <p className="text-xs text-muted">{formatDate(data.created_on)}</p>
            </div>
            <p className="text-xs text-muted">{data.description}</p>
        </div>
    )
}
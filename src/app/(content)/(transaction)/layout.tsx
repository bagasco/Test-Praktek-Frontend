import { Fragment, PropsWithChildren } from "react";
import Balance from "../_components/balance";
import { redirect } from "next/navigation";
import { getTransactionPageData } from "@/libs/actions/content";

export default async function LayoutTopup({ children }: PropsWithChildren) {
    const data = await getTransactionPageData();

    if (!data) redirect('/login');

    return (
        <Fragment>
            <Balance 
                avatar={data.profile.profile_image}
                fullName={data.profile.first_name + ' ' + data.profile.last_name} 
                balance={data.balance}
            />
            {children}
        </Fragment>
    )
}
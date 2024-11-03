import { PropsWithChildren } from "react";
import Header from "./_components/header";

export default function ContentLayout({ children }: PropsWithChildren) {
    return (
        <main className="container">
            <Header/>
            {children}
        </main>
    )
}
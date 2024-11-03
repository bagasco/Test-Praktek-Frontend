"use client";

import { ComponentProps, useState } from "react";
import Input from "./input";

export default function PasswordInput(props: ComponentProps<typeof Input>) {
    const [showPW,setShowPW] = useState(false);
    return <Input showPW={showPW} setShowPW={setShowPW} type="password" {...props}/>
}
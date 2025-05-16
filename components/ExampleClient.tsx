"use client"

import { useEffect,useState } from "react"
import { useSession } from "next-auth/react"
export default function ExampleClient(){ 

    const {data:session,status} = useSession();
    const [value, setValue] = useState("")
    useEffect (() => {
        if(status === "authenticated"){
            setValue(`component monunted ${session?.user?.name}`);
        }
        else if(status === "unauthenticated" || status === "loading"){
            setValue(`component not monunted guest`);
        }
    }, [status,session])
    return (
        <h1 className="text-xs">
            Exampleclient {value}
        </h1>
    )
}
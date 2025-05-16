// import { auth } from "@/auth";
import ExampleClient from "@/components/ExampleClient";
export default async function Example(){
    // const session = await auth();
    // // console.log(session?.user);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Example</h1>
            <ExampleClient />
        </div>
    )
}
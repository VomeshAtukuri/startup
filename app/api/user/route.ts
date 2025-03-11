import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    return new Response(JSON.stringify({ message: "Hello from route.ts" }), { status: 200 });
}


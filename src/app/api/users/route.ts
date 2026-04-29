import { NextResponse } from "next/server";
import { createUserService } from "@/services/users.service";
import { userSchema } from "@/validators/users.schema";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validation
        const parsed = userSchema.parse(body);

        // Business logic in service
        const user = await createUserService(parsed);

        return NextResponse.json(
            { success: true, data: user },
            { status: 201 }
        );

    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: err.status || 500 }
        );
    }
}

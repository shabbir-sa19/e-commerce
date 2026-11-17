import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().max(50).optional(),
}).strict().refine(
  (profile) => profile.firstName !== undefined || profile.lastName !== undefined,
  { message: "At least one profile field is required." },
);


export async function GET() {
  try {
    await auth.protect();

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }
    console.log(user)
    return NextResponse.json({ userId: user.id }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Unable to fetch User." }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  await auth.protect();
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }
  try {
    const body = await request.json();
    const parsed = profileSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 })
    }
    const client = await clerkClient();
    const user = await client.users.updateUser(userId, parsed.data);
    return NextResponse.json({ account: user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Unable to Update User." }, { status: 500 })
  }
}

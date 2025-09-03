import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.text();
  const h = headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  try {
    const evt = wh.verify(payload, {
      "svix-id": h.get("svix-id")!,
      "svix-timestamp": h.get("svix-timestamp")!,
      "svix-signature": h.get("svix-signature")!,
    });

    // For now, just log. We can add Dify sync next.
    console.log("Clerk webhook:", evt.type);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook verify error:", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }
}

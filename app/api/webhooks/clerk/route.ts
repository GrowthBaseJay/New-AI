// app/api/webhooks/clerk/route.ts
import type { NextRequest } from 'next/server';
import { Webhook } from 'svix';

export const runtime = 'nodejs'; // ensure Node runtime for svix verification

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Missing CLERK_WEBHOOK_SECRET', { status: 500 });
  }

  // Svix needs the exact raw body
  const payload = await req.text();

  // Read headers directly from the request (no Promise)
  const svixId = req.headers.get('svix-id');
  const svixSignature = req.headers.get('svix-signature');
  const svixTimestamp = req.headers.get('svix-timestamp');

  if (!svixId || !svixSignature || !svixTimestamp) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  const wh = new Webhook(secret);

  try {
    const evt = wh.verify(payload, {
      // keep keys alphabetically ordered to satisfy strict linters
      'svix-id': svixId,
      'svix-signature': svixSignature,
      'svix-timestamp': svixTimestamp,
    });

    // TODO: handle evt.type (user.created / user.updated / user.deleted) if needed
    console.log('Clerk webhook:', (evt as any).type);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook verify error:', err);
    return new Response(JSON.stringify({ error: 'invalid signature' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
}

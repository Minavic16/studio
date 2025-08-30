import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // dynamically import the server-only flow to avoid bundling server-only deps into client builds
    const mod = await import('@/ai/flows/admin-chatbot');
    const result = await mod.adminChatbot({ query: body.query });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

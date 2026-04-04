import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length > 200) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (typeof message !== "string" || message.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  // TODO: Wire up to a real email service.
  // Option A: Resend (npm install resend)
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "portfolio@yourdomain.com",
  //     to: "your-email@gmail.com",
  //     subject: `Portfolio contact from ${name}`,
  //     text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  //   });
  //
  // Option B: Formspree — just POST the form directly from the client
  //   to https://formspree.io/f/YOUR_FORM_ID (no API route needed)

  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true });
}

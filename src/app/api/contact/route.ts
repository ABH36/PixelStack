import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getMailTransporter, escapeHtml } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    projectType?: string;
    budget?: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const projectType = (body.projectType ?? "").trim();
  const budget = (body.budget ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email) || /[\r\n]/.test(name)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    await db.collection("contacts").insertOne({
      name,
      email,
      projectType,
      budget,
      message,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 }
    );
  }

  try {
    const transporter = getMailTransporter();
    await transporter.sendMail({
      from: `"PixelStack Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New project inquiry — ${projectType || "General"}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\nBudget: ${budget}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    // The submission is already saved in MongoDB even if the email fails,
    // so we don't lose the lead — just let the client know delivery is delayed.
    console.error("Failed to send contact notification email:", err);
    return NextResponse.json(
      { success: true, emailWarning: true },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true });
}

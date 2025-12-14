import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, subject, message } = data

    console.log("Contact form submission received:", {
      name,
      email,
      subject,
    })

    // Send confirmation email to client
    await resend.emails.send({
      from: "Quest & Horizon <noreply@questhorizon.com>",
      to: [email],
      subject: "Thank you for contacting Quest & Horizon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #226D68; color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">QUEST & HORIZON</h1>
          </div>
          <div style="padding: 30px 20px;">
            <h2 style="color: #226D68;">Thank You, ${name}!</h2>
            <p style="color: #666; line-height: 1.6;">
              We've received your message and will get back to you within 24 hours.
            </p>
            <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #F0BE86;">
              <p style="margin: 0; color: #666;"><strong>Your message:</strong></p>
              <p style="margin: 10px 0 0 0; color: #666;">${message}</p>
            </div>
            <p style="color: #666;">Best regards,<br>The Quest & Horizon Team</p>
          </div>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">© 2025 Quest & Horizon. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: "Contact Form <noreply@questhorizon.com>",
      to: ["info@questhorizon.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #226D68; color: white; padding: 20px;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 20px;">
            <h3 style="color: #226D68;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h3 style="color: #226D68; margin-top: 20px;">Message:</h3>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error sending contact email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

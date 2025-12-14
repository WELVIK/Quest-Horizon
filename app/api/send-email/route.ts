import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      clientEmail,
      clientName,
      packageName,
      depositAmount,
      totalAmount,
      bookingDate,
      referenceNumber,
      careNeeds,
      medicalInfo,
      emergencyContact,
    } = body

    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #226D68 0%, #1a5450 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">QUEST & HORIZON</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Booking Confirmation</p>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f9f5f0;">
          <h2 style="color: #226D68; margin-bottom: 20px;">Thank You, ${clientName}!</h2>
          
          <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
            Your booking request has been received. Our team will review your information and contact you within 24 hours to confirm your reservation.
          </p>

          <div style="background: white; border-left: 4px solid #226D68; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="color: #226D68; margin-top: 0;">Booking Details</h3>
            <p style="margin: 10px 0; color: #6B7280;"><strong>Reference Number:</strong> ${referenceNumber}</p>
            <p style="margin: 10px 0; color: #6B7280;"><strong>Package:</strong> ${packageName}</p>
            <p style="margin: 10px 0; color: #6B7280;"><strong>Travel Date:</strong> ${bookingDate}</p>
            <p style="margin: 10px 0; color: #6B7280;"><strong>Total Price:</strong> £${totalAmount}</p>
            <p style="margin: 10px 0; color: #F0BE86; font-weight: bold;"><strong>Deposit Paid:</strong> £${depositAmount}</p>
            <p style="margin: 10px 0; color: #6B7280;"><strong>Remaining Balance:</strong> £${totalAmount - depositAmount}</p>
          </div>

          <div style="background: #fff5f0; border-left: 4px solid #F0BE86; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <h3 style="color: #226D68; margin-top: 0;">What Happens Next?</h3>
            <ol style="color: #6B7280; line-height: 1.8;">
              <li>Our team will review your care needs and travel requirements</li>
              <li>We'll contact you to confirm details and answer any questions</li>
              <li>You'll receive a detailed booking confirmation with payment instructions</li>
              <li>Pre-trip planning begins including care coordination and risk assessment</li>
            </ol>
          </div>

          <p style="color: #6B7280; font-size: 12px; margin-top: 30px; text-align: center; border-top: 1px solid #E5E7EB; padding-top: 20px;">
            If you have any questions, please reply to this email or contact our support team at support@questhorizon.com
          </p>
        </div>
        
        <div style="background: #226D68; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2025 Quest & Horizon. All rights reserved.</p>
        </div>
      </div>
    `

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #226D68; color: white; padding: 20px;">
          <h1 style="margin: 0;">New Booking Request</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f5f0;">
          <h2 style="color: #226D68;">Booking Information</h2>
          
          <h3 style="color: #226D68; border-bottom: 2px solid #F0BE86; padding-bottom: 10px;">Client Information</h3>
          <p><strong>Name:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
          <p><strong>Reference:</strong> ${referenceNumber}</p>

          <h3 style="color: #226D68; border-bottom: 2px solid #F0BE86; padding-bottom: 10px; margin-top: 20px;">Booking Details</h3>
          <p><strong>Package:</strong> ${packageName}</p>
          <p><strong>Travel Date:</strong> ${bookingDate}</p>
          <p><strong>Total Amount:</strong> £${totalAmount}</p>
          <p><strong>Deposit Received:</strong> £${depositAmount}</p>

          <h3 style="color: #226D68; border-bottom: 2px solid #F0BE86; padding-bottom: 10px; margin-top: 20px;">Care Information</h3>
          <p><strong>Care Needs:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${careNeeds}</p>
          
          <p style="margin-top: 15px;"><strong>Medical Information:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px;">${medicalInfo}</p>

          <h3 style="color: #226D68; border-bottom: 2px solid #F0BE86; padding-bottom: 10px; margin-top: 20px;">Emergency Contact</h3>
          <p><strong>Name:</strong> ${emergencyContact.name}</p>
          <p><strong>Phone:</strong> ${emergencyContact.phone}</p>

          <div style="background: #fff5f0; padding: 15px; margin-top: 20px; border-radius: 4px; border-left: 4px solid #F0BE86;">
            <p style="margin: 0; font-weight: bold; color: #F0BE86;">Action Required:</p>
            <p style="margin: 5px 0 0 0; color: #6B7280;">Please review and confirm this booking within 24 hours.</p>
          </div>
        </div>
      </div>
    `

    // Send emails using Resend
    await resend.emails.send({
      from: "Quest & Horizon <noreply@questhorizon.com>",
      to: [clientEmail],
      subject: `Booking Confirmation - Reference: ${referenceNumber}`,
      html: clientEmailHtml,
    })

    await resend.emails.send({
      from: "Quest & Horizon Bookings <bookings@questhorizon.com>",
      to: ["admin@questhorizon.com"],
      subject: `New Booking Request - ${clientName} - Ref: ${referenceNumber}`,
      html: adminEmailHtml,
    })

    return NextResponse.json({ success: true, message: "Emails sent successfully" })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

// Mock database - Replace with actual database (Supabase, MongoDB, etc.)
const bookings: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      referenceNumber,
      clientName,
      clientEmail,
      clientPhone,
      packageName,
      packageId,
      bookingDate,
      totalAmount,
      depositAmount,
      careNeeds,
      dietaryRequirements,
      medicalInfo,
      emergencyContactName,
      emergencyContactPhone,
      bookingStatus,
      createdAt,
    } = body

    // Save booking data
    const booking = {
      id: referenceNumber,
      clientName,
      clientEmail,
      clientPhone,
      packageName,
      packageId,
      bookingDate,
      totalAmount,
      depositAmount,
      remainingBalance: totalAmount - depositAmount,
      careNeeds,
      dietaryRequirements,
      medicalInfo,
      emergencyContactName,
      emergencyContactPhone,
      bookingStatus: "pending_confirmation", // pending_confirmation, confirmed, completed, cancelled
      createdAt,
      updatedAt: createdAt,
    }

    // In production, save to database
    bookings.push(booking)
    console.log("[Database] Booking saved:", booking)

    // TODO: Save to actual database (Supabase, MongoDB, etc.)

    return NextResponse.json({
      success: true,
      message: "Booking saved successfully",
      bookingId: referenceNumber,
    })
  } catch (error) {
    console.error("Booking save error:", error)
    return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 })
  }
}

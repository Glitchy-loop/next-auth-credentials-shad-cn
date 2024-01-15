import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoDB()
    await User.create({ email, password: hashedPassword })

    return NextResponse.json({ message: "User registered" }, { status: 200 })
    // Use the email and password variables here
  } catch (error) {
    // Handle the error
    return NextResponse.json(
      { message: "User not registered" },
      { status: 400 }
    )
  }
}

import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await connectMongoDB()
    const { email } = await req.json()
    const user = await User.find({ email }).select("_id")
    console.log("user", user)

    return NextResponse.json({ message: "User exists" }, { status: 200 })
  } catch (error) {
    console.log(error)
  }
}

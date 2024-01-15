"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const SignInForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res && res.error) {
        toast("Invalid Credentials")
        return
      }

      if (res && res.ok) {
        router.replace("dashboard")
        toast("Logged in successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 m-auto">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Login in to your account</h2>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
      <Link href="/sign-up">
        <Button variant="link"> or Register</Button>
      </Link>
    </div>
  )
}

export default SignInForm

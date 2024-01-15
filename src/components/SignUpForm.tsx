"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface IFormInput {
  email: string
  password: string
}

const SignUpForm = () => {
  const [email, setEmail] = useState<String>("")
  const [password, setPassword] = useState<String>("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      toast("Please fill out all fields")
      return
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const { user } = await resUserExists.json()

      if (user) {
        toast(`User with email ${email} already exists`)
        return
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (res.ok) {
        toast("User registered. Please sign in")

        return router.push("/sign-in")
      } else {
        toast("Something went wrong")
      }
    } catch (error) {
      toast(error as string)
    }
  }

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-auto">
        <h2>Register your account</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Your@email.com"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
          />
          <Button type="submit">Submit</Button>
        </form>

        <Link href="/sign-in">
          <Button variant="link">Or Login</Button>
        </Link>
      </div>
    </>
  )
}

export default SignUpForm

"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className="m-auto grid max-w-sm bg-stone-900 p-3">
      <h1>Dashboard</h1>
      <p>{session?.user?.email}</p>

      <Button
        onClick={() => {
          signOut()
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Page

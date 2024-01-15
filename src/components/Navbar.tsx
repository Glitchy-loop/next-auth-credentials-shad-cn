"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="my-10 flex justify-center items-center">
      {!user && (
        <>
          <Link className="m-2" href="/sign-in">
            Login
          </Link>
          <Link className="m-2" href="/sign-up">
            Register
          </Link>
        </>
      )}

      {user && (
        <Link className="m-2" href="/dashboard">
          Dashboard
        </Link>
      )}
    </div>
  )
}

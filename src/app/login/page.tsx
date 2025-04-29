"use client"

import { LoginForm } from "@/components/login-form"
import { FormEvent } from 'react'
import { permanentRedirect } from 'next/navigation'
import bcrypt from "bcryptjs"

export default function Page() {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password');

    const hashedPassword = await bcrypt.hash(String(password), 12); // 12 is the number of salts

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, hashedPassword })
    })


    if (response.ok) {
      
      const user = await response.json()
      // console.log(JSON.stringify({ user }))
      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }), 
      })

      permanentRedirect("/home");
    } else {
      // Handle errors
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <LoginForm />
        </form>
      </div>
    </div>
  )
}

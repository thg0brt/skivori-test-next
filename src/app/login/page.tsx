"use client"

import { LoginForm } from "@/components/login-form"
import { FormEvent } from 'react'
import { permanentRedirect } from 'next/navigation'
import bcrypt from "bcryptjs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserStore } from "@/store/user-store"

export default function Page() {

  const {isStoreSet, hasHydrated, setUser, setIsStoreSet } = UserStore()

  //Attemp to log in when the login button is clicked.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password');

    //encrypt the password
    const hashedPassword = await bcrypt.hash(String(password), 12); // 12 is the number of salts

    //send HTTP request to authenticate, the users credentials is informed in the body
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, hashedPassword })
    })

    console.log("response", response);
    //If the users credential is valid, save the user information in the cookies
    if (response.ok) {
      
      // Send an HTTP request to the SSR to create a JWT and store the user's information in cookies
      const user = await response.json()
      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }), 
      })
  
      //set the user-store
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      })

      setIsStoreSet(true);

      //redirect to /home
      permanentRedirect("/home");

    } else {
        toast.error("Incorrect username or password. Please try again.", {
          closeButton: false,
          style: { width: "100%" }
      });
      console.log("error");
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <LoginForm />
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
    />
    </div>
  )
}

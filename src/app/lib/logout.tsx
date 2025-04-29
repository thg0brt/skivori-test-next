"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutAction() {
  // Clear the authentication cookie
  (await cookies()).delete("session")

  // Redirect to login page
  redirect("/login")
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Implement your session check logic here
        // For example, you might want to fetch user data from an API
        // const response = await fetch('/api/user');
        // const userData = await response.json();
        // setUser(userData);
      } catch (error) {
        console.error("Failed to check session:", error)
        setUser(null)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Implement your login logic here
      // For now, we'll just simulate a successful login
      setUser({ id: "1", name: "Test Kullanıcı", email })
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


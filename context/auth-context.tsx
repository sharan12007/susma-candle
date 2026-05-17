'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/lib/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/me')
      // if (response.ok) {
      //   const data = await response.json()
      //   setUser(data.user)
      // }
      
      // For now, check localStorage for demo
      const savedUser = localStorage.getItem('suarin-user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch {
      console.error('Failed to check auth')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // const data = await response.json()
      // if (response.ok) {
      //   setUser(data.user)
      //   return { success: true }
      // }
      // return { success: false, error: data.error }

      // Demo implementation - replace with API
      console.log('Login attempt:', { email, password })
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        addresses: [],
        orders: [],
        createdAt: new Date(),
      }
      setUser(mockUser)
      localStorage.setItem('suarin-user', JSON.stringify(mockUser))
      return { success: true }
    } catch {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // })
      // const data = await response.json()
      // if (response.ok) {
      //   setUser(data.user)
      //   return { success: true }
      // }
      // return { success: false, error: data.error }

      // Demo implementation - replace with API
      console.log('Register attempt:', { name, email, password })
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        addresses: [],
        orders: [],
        createdAt: new Date(),
      }
      setUser(mockUser)
      localStorage.setItem('suarin-user', JSON.stringify(mockUser))
      return { success: true }
    } catch {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const logout = () => {
    // TODO: Call logout API
    // await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    localStorage.removeItem('suarin-user')
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('suarin-user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

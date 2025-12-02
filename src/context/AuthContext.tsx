'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const MOCK_USER: User = {
  id: '1',
  email: 'demo@revitalizedhealth.com',
  firstName: 'John',
  lastName: 'Smith',
  phone: '(303) 555-1234',
}

// Mock credentials
const MOCK_CREDENTIALS = {
  email: 'demo@revitalizedhealth.com',
  password: 'demo123',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('revitalized_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Check mock credentials
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      setUser(MOCK_USER)
      localStorage.setItem('revitalized_user', JSON.stringify(MOCK_USER))
      return true
    }
    return false
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('revitalized_user')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
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

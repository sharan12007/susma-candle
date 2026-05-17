'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For now, always succeed (mock implementation)
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>

          <div className="rounded-xl border border-border bg-card p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <h1 className="mt-6 text-2xl font-light tracking-wide text-foreground">
                  Check Your Email
                </h1>
                <p className="mt-4 text-muted-foreground">
                  We&apos;ve sent password reset instructions to <span className="font-medium text-foreground">{email}</span>. 
                  The link will expire in 24 hours.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setEmail('')
                    }}
                    className="text-primary hover:underline"
                  >
                    try again
                  </button>
                </p>
                <Button asChild className="mt-8 w-full" variant="outline">
                  <Link href="/login">Return to Login</Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="mt-6 text-2xl font-light tracking-wide text-foreground">
                    Forgot Password?
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No worries! Enter your email and we&apos;ll send you reset instructions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="mt-1"
                      required
                      autoFocus
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Remember your password?{' '}
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

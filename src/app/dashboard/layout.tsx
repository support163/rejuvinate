import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Revitalized Health',
  description: 'Manage your health journey with Revitalized Health dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Revitalized Health - Personalized Hormone Therapies & More',
  description: 'Regain the energy you once had with personalized hormone therapies, peptide treatments, telemedicine & more. Family-owned healthcare putting patients first.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

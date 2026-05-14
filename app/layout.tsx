import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TKJerseys — Player Version Voetbaltenues',
  description:
    'Player version voetbaltenues direct bij jou. Exact hetzelfde als wat de profs dragen. Naam en rugnummer mogelijk. Neem contact op via WhatsApp.',
  keywords: 'player version jersey, voetbaltenue, footballshirt, replica jersey, naam rugnummer jersey',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'TKJerseys',
    locale: 'nl_NL',
    type: 'website',
    title: 'TKJerseys — Player Version Voetbaltenues',
    description: 'Dezelfde kwaliteit als wat de profs dragen. Jouw club, jouw naam, jouw nummer.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-body bg-pitch min-h-screen text-chalk antialiased">
        {children}
      </body>
    </html>
  )
}

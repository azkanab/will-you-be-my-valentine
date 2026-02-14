import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, Inter } from 'next/font/google'

import './globals.css'

const _pixelFont = Press_Start_2P({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-pixel',
})

const _inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "You've got a mail!",
  description: 'A special Valentine surprise',
  icons: {
    icon: "/icon.png",              // default favicon
    apple: "/icon.png",    // for iOS
  },
}

export const viewport: Viewport = {
  themeColor: '#e8557a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_pixelFont.variable} ${_inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}

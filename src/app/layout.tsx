import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rythovius WON onderzoekshulp',
  description: 'Een digitale begeleider voor het maken van een werkstuk - Rythovius College',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-100 min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
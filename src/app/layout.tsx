import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rythovius WON onderzoekshulp',
  description: 'Een digitale begeleider voor het maken van een werkstuk - Rythovius College',
  keywords: ['rythovius', 'won', 'onderzoekshulp', 'werkstuk', 'stappenplan', 'onderwijs'],
  authors: [{ name: 'Rythovius College' }],
  robots: 'noindex, nofollow', // Prevent search engine indexing during development
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        <title>Rythovius WON onderzoekshulp</title>
        <meta name="description" content="Een digitale begeleider voor het maken van een werkstuk - Rythovius College" />
      </head>
      <body className="bg-gray-100 min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
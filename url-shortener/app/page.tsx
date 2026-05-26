import { Suspense } from 'react'
import { UrlShortener } from '@/components/url-shortener'

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-start py-16 px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">LinkSnip</h1>
          <p className="text-muted-foreground text-lg">
            Shorten URLs, track clicks, set expiry — backed by durable Temporal workflows.
          </p>
        </div>
        <Suspense>
          <UrlShortener />
        </Suspense>
      </div>
    </main>
  )
}

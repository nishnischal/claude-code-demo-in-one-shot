'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface ShortenResult {
  slug: string
  shortUrl: string
  longUrl: string
  expiresAt: string | null
  createdAt: string
}

interface StatsResult {
  slug: string
  longUrl: string
  clicks: number
  createdAt: string
  expiresAt: string | null
  expired: boolean
  recentClicks: Array<{
    clickedAt: string
    referrer: string | null
    userAgent: string | null
  }>
}

export function UrlShortener() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [result, setResult] = useState<ShortenResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const [statsSlug, setStatsSlug] = useState('')
  const [stats, setStats] = useState<StatsResult | null>(null)
  const [statsError, setStatsError] = useState<string | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)

  useEffect(() => {
    if (errorParam === 'not_found') setError('That short link does not exist.')
    else if (errorParam === 'expired') setError('That short link has expired.')
  }, [errorParam])

  async function handleShorten(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          ...(customSlug ? { customSlug } : {}),
          ...(expiresAt ? { expiresAt: new Date(expiresAt).toISOString() } : {}),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
      } else {
        setResult(data)
        setUrl('')
        setCustomSlug('')
        setExpiresAt('')
      }
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result.shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleStats(e: React.FormEvent) {
    e.preventDefault()
    setStatsError(null)
    setStats(null)
    setStatsLoading(true)

    try {
      const res = await fetch(`/api/stats/${encodeURIComponent(statsSlug)}`)
      const data = await res.json()
      if (!res.ok) {
        setStatsError(data.error ?? 'Not found')
      } else {
        setStats(data)
      }
    } catch {
      setStatsError('Network error — please try again')
    } finally {
      setStatsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Shorten form */}
      <Card>
        <CardHeader>
          <CardTitle>Shorten a URL</CardTitle>
          <CardDescription>Paste your long URL and get a short link instantly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleShorten} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Shortening…' : 'Shorten'}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAdvanced ? '▾ Hide advanced options' : '▸ Advanced options'}
            </button>

            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="custom-slug">Custom slug (optional)</Label>
                  <Input
                    id="custom-slug"
                    placeholder="my-link"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    pattern="[a-zA-Z0-9\-_]+"
                    minLength={3}
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground">Letters, numbers, hyphens, underscores</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="expires-at">Expiry date/time (optional)</Label>
                  <Input
                    id="expires-at"
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>
            )}
          </form>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
          )}

          {result && (
            <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Your short link</span>
                {result.expiresAt && (
                  <Badge variant="secondary">
                    Expires {new Date(result.expiresAt).toLocaleDateString()}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-background rounded px-3 py-2 border font-mono break-all">
                  {result.shortUrl}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className={cn(copied && 'text-green-600')}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                → {result.longUrl}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Stats lookup */}
      <Card>
        <CardHeader>
          <CardTitle>Link Analytics</CardTitle>
          <CardDescription>Enter a slug to view click stats and recent visitors.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleStats} className="flex gap-2">
            <Input
              placeholder="your-slug"
              value={statsSlug}
              onChange={(e) => setStatsSlug(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" variant="outline" disabled={statsLoading}>
              {statsLoading ? 'Loading…' : 'View stats'}
            </Button>
          </form>

          {statsError && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{statsError}</p>
          )}

          {stats && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-mono font-medium">/{stats.slug}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-sm">{stats.longUrl}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={stats.expired ? 'destructive' : 'default'}>
                      {stats.expired ? 'Expired' : 'Active'}
                    </Badge>
                    <span className="text-2xl font-bold">{stats.clicks.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">clicks</span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <span>Created: {new Date(stats.createdAt).toLocaleString()}</span>
                  {stats.expiresAt && (
                    <span>Expires: {new Date(stats.expiresAt).toLocaleString()}</span>
                  )}
                </div>
              </div>

              {stats.recentClicks.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent clicks (last {stats.recentClicks.length})</p>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {stats.recentClicks.map((click, i) => (
                      <div key={i} className="rounded border px-3 py-2 text-xs space-y-0.5">
                        <p className="text-muted-foreground">{new Date(click.clickedAt).toLocaleString()}</p>
                        {click.referrer && (
                          <p className="truncate">Referrer: <span className="font-mono">{click.referrer}</span></p>
                        )}
                        {click.userAgent && (
                          <p className="truncate text-muted-foreground">{click.userAgent}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

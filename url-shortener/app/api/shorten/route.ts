import { z } from 'zod'
import { prisma } from '@/lib/db'
import { generateSlug, isValidUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const shortenSchema = z.object({
  url: z.string().url('Invalid URL'),
  customSlug: z.string().min(3).max(50).regex(/^[a-zA-Z0-9-_]+$/, 'Slug must be alphanumeric').optional(),
  expiresAt: z.string().datetime().optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = shortenSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const { url, customSlug, expiresAt } = parsed.data

  if (!isValidUrl(url)) {
    return Response.json({ error: 'URL must use http or https' }, { status: 400 })
  }

  const slug = customSlug ?? generateSlug()

  try {
    const shortened = await prisma.url.create({
      data: {
        slug,
        longUrl: url,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    return Response.json({
      slug: shortened.slug,
      shortUrl: `${baseUrl}/${shortened.slug}`,
      longUrl: shortened.longUrl,
      expiresAt: shortened.expiresAt,
      createdAt: shortened.createdAt,
    }, { status: 201 })
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2002') {
      return Response.json({ error: 'That custom slug is already taken' }, { status: 409 })
    }
    console.error('Failed to create URL:', err)
    return Response.json({ error: 'Failed to create short URL' }, { status: 500 })
  }
}

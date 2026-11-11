/**
 * Vercel Edge Function for creating short links
 *
 * This function handles POST requests to create new short links.
 * It stores the slug -> WhatsApp URL mapping in the data store.
 *
 * For production: Use Vercel KV, Upstash Redis, or any database.
 * This in-memory store is for demo purposes only.
 */

// In-memory store for demo purposes only
// For production: Replace with Vercel KV (kv.vercel.com), Upstash Redis, or any database
const shortLinkStore = new Map([
  // Demo entries
  ['demo', { url: 'https://wa.me/15551234567?text=Hello%20from%20Watslink!', createdAt: Date.now(), clicks: 0 }],
  ['test', { url: 'https://wa.me/15559876543?text=Test%20message', createdAt: Date.now(), clicks: 0 }],
]);

// Helper to get store from request context (for serverless environments)
function getStore() {
  // In production, you would use Vercel KV:
  // import { kv } from '@vercel/kv';
  // return kv;

  // For demo, return the in-memory store
  return shortLinkStore;
}

function generateRandomSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateUniqueSlug(customSlug = null) {
  if (customSlug && customSlug.trim()) {
    return customSlug.trim();
  }
  let slug;
  let attempts = 0;
  do {
    slug = generateRandomSlug(6);
    attempts++;
  } while (shortLinkStore.has(slug) && attempts < 100);
  return slug;
}

function validateSlug(slug) {
  if (!slug || !slug.trim()) {
    return { valid: false, error: 'Please enter a custom link name' };
  }
  const trimmed = slug.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Link name must be at least 2 characters' };
  }
  if (trimmed.length > 50) {
    return { valid: false, error: 'Link name must be 50 characters or less' };
  }
  if (!/^[a-zA-Z0-9\-_]+$/.test(trimmed)) {
    return { valid: false, error: 'Only letters, numbers, hyphens, and underscores allowed' };
  }
  const reserved = ['api', 'admin', 'app', 'www', 'mail', 'ftp', 'blog', 'shop', 'store', 'support', 'help', 'docs', 'status', 'legal', 'privacy', 'terms', 'contact', 'about', 'login', 'signup', 'register', 'signin', 'signout', 'logout', 'auth', 'oauth', 'callback', 'redirect', 'webhook', 'cdn', 'static', 'assets', 'media', 'images', 'img', 'css', 'js', 'api', 'v1', 'v2', 'v3', 'go', 'link', 'short', 'qr', 'qr-code', 'generate', 'create', 'new', 'edit', 'delete', 'settings', 'account', 'profile', 'dashboard', 'analytics', 'stats'];
  if (reserved.includes(trimmed.toLowerCase())) {
    return { valid: false, error: 'This name is reserved. Please choose another.' };
  }
  if (shortLinkStore.has(trimmed)) {
    return { valid: false, error: 'This link name is already taken. Please choose another.' };
  }
  return { valid: true, slug: trimmed };
}

export default async function handler(request) {
  const url = new URL(request.url);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const store = shortLinkStore; // In production, use getStore()

  // GET /api/short - List all short links (for admin/debug)
  if (request.method === 'GET') {
    const links = [];
    for (const [slug, data] of store.entries()) {
      links.push({ slug, ...data });
    }
    return Response.json({ links });
  }

  // POST /api/short - Create a new short link
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const { whatsappUrl, customSlug } = body;

      if (!whatsappUrl) {
        return Response.json({ error: 'WhatsApp URL is required' }, { status: 400 });
      }

      // Validate the WhatsApp URL
      try {
        new URL(whatsappUrl);
      } catch {
        return Response.json({ error: 'Invalid WhatsApp URL' }, { status: 400 });
      }

      // Generate or validate slug
      const slugResult = customSlug
        ? validateSlug(customSlug)
        : { valid: true, slug: generateUniqueSlug() };

      if (!slugResult.valid) {
        return Response.json({ error: slugResult.error }, { status: 400 });
      }

      const slug = slugResult.slug;

      // Store the mapping
      store.set(slug, {
        url: whatsappUrl,
        createdAt: Date.now(),
        clicks: 0,
      });

      // Return the created short link
      const baseUrl = new URL(request.url).origin;
      const shortUrl = `${baseUrl}/${slug}`;

      return Response.json({
        slug,
        shortUrl,
        whatsappUrl,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error('Error creating short link:', error);
      return Response.json({ error: 'Failed to create short link' }, { status: 500 });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
}

export const config = {
  runtime: 'edge',
};
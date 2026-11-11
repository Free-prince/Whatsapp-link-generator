/**
 * Vercel Edge Function for handling short link redirects
 *
 * This function handles requests to /:slug and redirects to the corresponding WhatsApp URL.
 *
 * For production: Replace the in-memory store with Vercel KV, Upstash Redis, or any database.
 * This in-memory store is for demo purposes only - data is lost on function cold start.
 *
 * Deploy to Vercel: This file should be placed at api/short/[slug].js
 * And vercel.json should have a rewrite rule: "/:slug" -> "/api/short/:slug"
 */

// In-memory store for demo purposes only
// For production: Replace with Vercel KV (kv.vercel.com), Upstash Redis, or any database
const shortLinkStore = new Map([
  // Demo entries - in production these would come from your database
  ['demo', 'https://wa.me/15551234567?text=Hello%20from%20Watslink!'],
  ['test', 'https://wa.me/15559876543?text=Test%20message'],
]);

// Helper to get store from request context (for serverless environments)
function getStore() {
  // In production, you would use Vercel KV:
  // import { kv } from '@vercel/kv';
  // return kv;

  // For demo, return the in-memory store
  return shortLinkStore;
}

export default async function handler(request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop(); // Get the slug from the path

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const store = getStore();
  const entry = store.get(slug);

  if (!entry) {
    // Slug not found - redirect to main page with error parameter
    // Or return 404 page
    const notFoundUrl = new URL('/', request.url);
    notFoundUrl.searchParams.set('error', 'shortlink_not_found');
    notFoundUrl.searchParams.set('slug', slug);
    return Response.redirect(notFoundUrl.toString(), 302);
  }

  // Increment click count (in production, use atomic increment in Redis/KV)
  entry.clicks = (entry.clicks || 0) + 1;
  entry.lastClicked = new Date().toISOString();

  // Redirect to the WhatsApp URL
  return Response.redirect(entry.url, 302);
}

export const config = {
  runtime: 'edge',
};
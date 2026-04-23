import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ params, locals }) => {
  locals.log.set({ user: { id: params.id } })

  const user = { name: "John Doe", plan: "premium" }
  locals.log.set({ user: { name: user.name, plan: user.plan } })

  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  })
}

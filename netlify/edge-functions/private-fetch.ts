// @ts-ignore
import { encode } from 'https://deno.land/std@0.199.0/encoding/base64.ts'

// @ts-ignore
import type { Config } from 'https://edge.netlify.com'

export default async (req: Request) => {
  const password = req.headers.get('Sds-Private-Auth')
  const basic = `Basic ${encode(`sdsuser:${password}`)}`

  const url = req.url.replace(/^.*?\/private/, 'https://smarthr-design-system-private.netlify.app')
  const res = await fetch(url, {
    headers: {
      Authorization: basic,
    },
  })

  if (res.status === 200) {
    return res
  }

  return new Response('Unauthorized', { status: 401 })
}

export const config: Config = {
  path: '/private/*',
}

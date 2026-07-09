export class RequestError extends Error {
  status: number
  response: any

  constructor(message: string, status: number, response?: any) {
    super(message)
    this.status = status
    this.response = response
  }
}

function interpolate(template: string, params: Record<string, any>): { url: string; query: Record<string, any> } {
  let url = template
  const query: Record<string, any> = {}

  for (const [key, value] of Object.entries(params)) {
    if (url.includes(`:${key}`)) {
      url = url.replace(`:${key}`, encodeURIComponent(String(value)))
    } else {
      query[key] = value
    }
  }

  return { url, query }
}

export function createRequest(baseUrl: string, auth?: string) {
  return async function request(
    route: string,
    options: Record<string, any> = {},
  ): Promise<any> {
    const idx = route.indexOf(' ')
    const method = route.slice(0, idx) as 'GET' | 'POST' | 'PUT' | 'DELETE'
    const urlTemplate = route.slice(idx + 1)

    const { data, headers: extraHeaders, ...rest } = options
    const { url: resolvedUrl, query } = interpolate(urlTemplate, rest)

    const apiUrl = new URL(resolvedUrl, baseUrl)
    if (auth) {
      apiUrl.searchParams.set('access_token', auth)
    }
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        apiUrl.searchParams.set(key, String(value))
      }
    }

    const headers: Record<string, string> = { ...extraHeaders }
    let body: BodyInit | undefined

    if (data instanceof FormData) {
      body = data
    } else if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(apiUrl.toString(), { method, headers, body })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: response.statusText }))
      throw new RequestError(errorBody.error || `HTTP ${response.status}`, response.status, errorBody)
    }

    if (response.status === 204) return null
    return response.json()
  }
}

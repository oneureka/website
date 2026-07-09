import ky from 'ky'

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
  const api = ky.create({
    prefix: baseUrl,
    throwHttpErrors: false,
  })

  return async function request(
    route: string,
    options: Record<string, any> = {},
  ): Promise<any> {
    const sep = route.indexOf(' ')
    const method = route.slice(0, sep) as 'GET' | 'POST' | 'PUT' | 'DELETE'
    const urlTemplate = route.slice(sep + 1)

    const { data, headers: extraHeaders, ...rest } = options
    const { url: resolvedUrl, query } = interpolate(urlTemplate, rest)

    const searchParams: Record<string, string> = { ...query }
    if (auth) {
      searchParams.access_token = auth
    }

    const requestOptions: Record<string, any> = {
      method,
      headers: { ...extraHeaders },
      searchParams,
    }

    if (data instanceof FormData) {
      requestOptions.body = data
    } else if (data !== undefined) {
      requestOptions.json = data
    }

    const response = await api(resolvedUrl, requestOptions)

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: response.statusText }))
      throw new RequestError(errorBody.error || `HTTP ${response.status}`, response.status, errorBody)
    }

    if (response.status === 204) return null
    return response.json()
  }
}

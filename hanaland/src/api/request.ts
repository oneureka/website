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

type RequestOptions = {
  data?: any
  headers?: Record<string, string>
  signal?: AbortSignal
  [key: string]: any
}

export type RequestFunction = (route: string, options?: RequestOptions) => Promise<any>

export function createRequest(baseUrl: string) {
  const api = ky.create({
    prefix: baseUrl,
    throwHttpErrors: false,
  })

  let auth: string | undefined

  function setAuth(value: string | undefined) {
    auth = value
  }

  const request: RequestFunction = async function (
    route: string,
    options: RequestOptions = {},
  ): Promise<any> {
    const sep = route.indexOf(' ')
    const method = route.slice(0, sep) as 'GET' | 'POST' | 'PUT' | 'DELETE'
    const urlTemplate = route.slice(sep + 1)

    const { data, headers, signal, ...rest } = options
    const { url: resolvedUrl, query } = interpolate(urlTemplate, rest)

    const searchParams: Record<string, string> = { ...query }
    if (auth) {
      searchParams.access_token = auth
    }

    const requestOptions: Record<string, any> = {
      method,
      headers,
      searchParams,
      signal,
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

  return { setAuth, request }
}

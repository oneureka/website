import type { KyInstance } from 'ky'
import type { RequestFunction } from './types/api'
import { compileUrl } from '../utils/compile-url'

export function createRequest(kyInstance: { create: (options?: object) => KyInstance }, baseUrl: string) {
  let auth: string | undefined

  function injectAuth({ request }: { request: Request }): Request | void {
    if (!auth) return
    const url = new URL(request.url)
    url.searchParams.set('access_token', auth)
    return new Request(url, request)
  }

  const api = kyInstance.create({
    prefix: baseUrl,
    hooks: { beforeRequest: [injectAuth] },
  })

  function setAuth(value: string | undefined) {
    auth = value
  }

  const request: RequestFunction = async function (route, options = {}): Promise<any> {
    const { method, url: urlTemplate } = route
    const { data, ...rest } = options
    const { url: resolvedUrl, query } = compileUrl(urlTemplate, rest)

    const requestOptions: Record<string, any> = {
      method,
      searchParams: query,
    }

    if (data instanceof FormData) {
      requestOptions.body = data
    } else if (data !== undefined) {
      requestOptions.json = data
    }

    const response = await api(resolvedUrl, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    if (response.status === 204) return null
    return response.json()
  }

  return { setAuth, request }
}

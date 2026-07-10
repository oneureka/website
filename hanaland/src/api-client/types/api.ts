export type Route = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
}

export type PageParams = {
  limit?: number
  offset?: number
}

export type RequestFunction = <T = any>(route: Route, options?: { data?: any } & Record<string, any>) => Promise<T>

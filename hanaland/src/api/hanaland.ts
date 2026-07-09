import { createRequest } from './request'
import topicsEndpoints from './endpoints/topics'
import usersEndpoints from './endpoints/users'
import nodesEndpoints from './endpoints/nodes'
import repliesEndpoints from './endpoints/replies'
import photosEndpoints from './endpoints/photos'
import notificationsEndpoints from './endpoints/notifications'

type EndpointDef = {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  transform?: (data: any, params?: any) => any
}

type EndpointsArray = readonly EndpointDef[]

function buildMethods(endpoints: EndpointsArray, request: ReturnType<typeof createRequest>) {
  const methods: Record<string, Function> = {}

  for (const { id, method, url, transform } of endpoints) {
    methods[id] = async function (options: Record<string, any> = {}) {
      const route = `${method} ${url}`
      const result = await request(route, options)
      return transform ? transform(result, options) : result
    }
  }

  return methods
}

export type HanalandOptions = {
  baseUrl?: string
  auth?: string
}

export class Hanaland {
  request: ReturnType<typeof createRequest>
  rest: {
    topics: ReturnType<typeof buildMethods>
    users: ReturnType<typeof buildMethods>
    nodes: ReturnType<typeof buildMethods>
    replies: ReturnType<typeof buildMethods>
    photos: ReturnType<typeof buildMethods>
    notifications: ReturnType<typeof buildMethods>
  }

  private _baseUrl: string
  private _auth?: string

  constructor({ baseUrl, auth }: HanalandOptions = {}) {
    this._baseUrl = baseUrl || import.meta.env.HANALAND_API_URL || ''
    this._auth = auth
    this.request = createRequest(this._baseUrl, this._auth)
    this.rest = {
      topics: buildMethods(topicsEndpoints, this.request),
      users: buildMethods(usersEndpoints, this.request),
      nodes: buildMethods(nodesEndpoints, this.request),
      replies: buildMethods(repliesEndpoints, this.request),
      photos: buildMethods(photosEndpoints, this.request),
      notifications: buildMethods(notificationsEndpoints, this.request),
    }
  }

  setToken(value: string) {
    this._auth = value
    this.request = createRequest(this._baseUrl, this._auth)
  }

  revokeToken() {
    this._auth = undefined
    this.request = createRequest(this._baseUrl)
  }
}

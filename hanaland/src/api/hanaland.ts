import { createRequest, type RequestFunction } from './request'
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
}

type EndpointsArray = readonly EndpointDef[]

function buildMethods(endpoints: EndpointsArray, request: RequestFunction) {
  const methods: Record<string, Function> = {}

  for (const { id, method, url } of endpoints) {
    methods[id] = async function (options: Record<string, any> = {}) {
      return request(`${method} ${url}`, options)
    }
  }

  return methods
}

export type HanalandOptions = {
  baseUrl?: string
  auth?: string
}

export class Hanaland {
  request: RequestFunction
  topics: ReturnType<typeof buildMethods>
  users: ReturnType<typeof buildMethods>
  nodes: ReturnType<typeof buildMethods>
  replies: ReturnType<typeof buildMethods>
  photos: ReturnType<typeof buildMethods>
  notifications: ReturnType<typeof buildMethods>

  private _ctx: { setAuth: (value: string | undefined) => void; request: RequestFunction }

  constructor({ baseUrl, auth }: HanalandOptions = {}) {
    const base = baseUrl || import.meta.env.HANALAND_API_URL || ''
    this._ctx = createRequest(base)
    this.request = this._ctx.request
    if (auth) {
      this._ctx.setAuth(auth)
    }
    this.topics = buildMethods(topicsEndpoints, this.request)
    this.users = buildMethods(usersEndpoints, this.request)
    this.nodes = buildMethods(nodesEndpoints, this.request)
    this.replies = buildMethods(repliesEndpoints, this.request)
    this.photos = buildMethods(photosEndpoints, this.request)
    this.notifications = buildMethods(notificationsEndpoints, this.request)
  }

  setToken(value: string) {
    this._ctx.setAuth(value)
  }

  revokeToken() {
    this._ctx.setAuth(undefined)
  }
}

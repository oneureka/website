import type { RequestFunction } from '../request'
import type { Node } from '../types/node'
import { nodes } from '../endpoints'

export class NodesResource {
  private api: RequestFunction

  constructor(api: RequestFunction) {
    this.api = api
  }

  list() {
    return this.api<{ nodes: Node[] }>(nodes.list)
  }

  retrieve(params: { id: number }) {
    return this.api<Node>(nodes.retrieve, params)
  }
}

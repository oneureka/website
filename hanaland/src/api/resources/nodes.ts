import { nodes as ep } from '../endpoints'
import type { RequestFunction } from '../request'
import type { Node } from '../types/node'

export class NodesResource {
  constructor(private api: RequestFunction) {}

  list() {
    return this.api<{ nodes: Node[] }>(ep.list)
  }

  retrieve(params: { id: number }) {
    return this.api<Node>(ep.retrieve, params)
  }
}

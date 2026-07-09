import type { NodeObject } from '../types/node'
import { transformNode } from '../types/node'

function transformList(data: any) {
  return (data.nodes || []).map(transformNode) as NodeObject[]
}

function transformRetrieve(data: any) {
  return transformNode(data.node)
}

export default [
  { id: 'list', method: 'GET', url: '/nodes', transform: transformList },
  { id: 'retrieve', method: 'GET', url: '/nodes/:id', transform: transformRetrieve },
] as const

export type NodeObject = {
  id: number
  name: string
  summary: string
  sectionId: number
  sectionName: string
  topicsCount: number
  sort: number
  updatedAt: string
}

export function transformNode(data: Record<string, any>): NodeObject {
  return {
    id: data.id,
    name: data.name,
    summary: data.summary,
    sectionId: data.section_id,
    sectionName: data.section_name,
    topicsCount: data.topics_count,
    sort: data.sort,
    updatedAt: data.updated_at,
  }
}

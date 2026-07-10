export function compileUrl(template: string, params: Record<string, any>): { url: string; query: Record<string, any> } {
  const used = new Set<string>()
  const url = template.replace(/:(\w+)/g, (_, key) => {
    used.add(key)
    return key in params ? encodeURIComponent(String(params[key])) : `:${key}`
  })
  const query: Record<string, any> = {}
  for (const [key, value] of Object.entries(params)) {
    if (!used.has(key)) {
      query[key] = value
    }
  }
  return { url, query }
}

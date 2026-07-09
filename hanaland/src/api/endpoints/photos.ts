function transformCreate(data: any) {
  return { url: data.image_url as string }
}

export default [
  { id: 'create', method: 'POST', url: '/photos', transform: transformCreate },
] as const

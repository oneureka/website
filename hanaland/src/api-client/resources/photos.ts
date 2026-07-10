import type { RequestFunction } from '../types/api'
import { photos } from '../endpoints'

export class PhotosResource {
  private api: RequestFunction

  constructor(api: RequestFunction) {
    this.api = api
  }

  create(params: { image: File }) {
    const formData = new FormData()
    formData.append('image', params.image)
    return this.api<{ url: string }>(photos.create, { data: formData })
  }
}

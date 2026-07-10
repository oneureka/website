import type { RequestFunction } from '../request'
import { photos } from '../endpoints'

export class PhotosResource {
  private api: RequestFunction

  constructor(api: RequestFunction) {
    this.api = api
  }

  create(params: { image: File }) {
    return this.api<{ url: string }>(photos.create, { data: params })
  }
}

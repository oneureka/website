import { photos } from '../endpoints'
import type { RequestFunction } from '../request'

export class PhotosResource {
  constructor(private api: RequestFunction) {}

  create(params: { image: File }) {
    return this.api<{ url: string }>(photos.create, { data: params })
  }
}

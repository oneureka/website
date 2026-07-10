export { Client } from './client'
export type { HanalandOptions } from './client'
export { RequestError } from './request'
export type { Topic } from './types/topic'
export type { User } from './types/user'
export type { Reply } from './types/reply'
export type { Node } from './types/node'
export type { Notification } from './types/notification'

import { Client } from './client'
export const rest = new Client()

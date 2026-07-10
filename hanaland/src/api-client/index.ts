export type { Node } from './types/node'
export type { Notification } from './types/notification'
export type { Reply } from './types/reply'
export type { Topic } from './types/topic'
export type { User } from './types/user'

import { Client, type ClientOptions } from './client'
export { Client, type ClientOptions }

export const rest = new Client()

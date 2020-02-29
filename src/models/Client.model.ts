import { Collection } from '../collections-module/Collection.class';
import Collections from '../utils/collections.constants';


export interface IClient {
  id: string
  name: string
  color: string
  value: number
  endAt: string
  startAt: string

  sigla?: string
  description?: string
}

export const Client = new Collection(Collections.clients);
import { Collection } from '../collections-module/Collection.class';
import Collections from '../utils/collections.constants';

export interface IEvent {
  id: string,
  client_id: string,
  date: any
};

export const Event = new Collection(Collections.events);
import { Collection } from '../collections-module/Collection.class';
import Collections from '../utils/collections.constants';

export interface IEvent {
  id: string,
  name: string
};

export const Client = new Collection(Collections.events);
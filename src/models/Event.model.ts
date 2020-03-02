import { Collection } from '../collections-module/Collection.class';
import Collections from '../utils/collections.constants';
import { IClient } from './Client.model';

export interface IEvent {
  id: string,
  client_id: string,
  date: any


  fullClient: IClient
};

export const Event = new Collection(Collections.events);
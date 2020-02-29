import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Collections from '../utils/collections.constants';
import { db } from '../config/firebase.config';

export interface WhereQuery {
  key: string,
  operation: FirebaseFirestoreTypes.WhereFilterOp,
  value: any
}

export class Collection<T> {

  private _collection: FirebaseFirestoreTypes.CollectionReference;

  constructor(collection: Collections) {
    this._collection = db
      .collection(collection)
  }

  async getAll(queries: WhereQuery[] = []) {
    let consult = this._collection;
    for (let query of queries) {
      consult = consult.where(query.key, query.operation, query.value) as FirebaseFirestoreTypes.CollectionReference;
    };
    const { docs } = await consult.get()
    return docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  add(item: T) {
    return this._collection.add(item);
  }

  update(id: string, item: Partial<T>) {
    return this._collection.doc(id).set(item, { merge: true });
  }

  async get(id: string) {
    const document = await this._collection.doc(id).get()
    return { id, ...document.data() };
  }
}

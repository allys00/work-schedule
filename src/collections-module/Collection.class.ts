import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Collections from '../utils/collections.constants';
import { db } from '../config/firebase.config';
import { WhereQuery } from './Collection.hook';



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

  async add(item: T) {
    return await this._collection.add(item);
  }

  async update(id: string, item: Partial<T>) {
    return await this._collection.doc(id).set(item, { merge: true });
  }

  async get(id: string) {
    const document = await this._collection.doc(id).get()
    return { id, ...document.data() };
  }

  async removeMultiples(queries: WhereQuery[] = []) {
    let consult = this._collection;
    for (const query of queries) {
      consult = consult.where(query.key, query.operation, query.value) as FirebaseFirestoreTypes.CollectionReference;
    };

    const snapshot = await consult.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    return await batch.commit();
  }

  async remove(id: string) {
    return await this._collection.doc(id).delete();
  }
}

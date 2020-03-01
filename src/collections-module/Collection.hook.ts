import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import Collections from '../utils/collections.constants';
import { db } from '../config/firebase.config';

export interface WhereQuery {
  key: string,
  operation: FirebaseFirestoreTypes.WhereFilterOp,
  value: any
};

export interface OrderBy {
  key: string,
  type: OrderType
};

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc'
};

export function useCollections<T>(collection: Collections, queries?: WhereQuery[], orders?: OrderBy[]) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const onRefresh = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    let consult = db.collection(collection);
    if (queries) {
      for (let query of queries) {
        consult = consult.where(query.key, query.operation, query.value) as FirebaseFirestoreTypes.CollectionReference;
      }
    };
    if (orders) {
      for (let order of orders) {
        consult = consult.orderBy(order.key, order.type) as FirebaseFirestoreTypes.CollectionReference;
      };
    }
    setLoading(true);
    const unsubscribe = consult
      .onSnapshot(querySnapshot => {
        const data: T[] = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...(documentSnapshot.data() as T),
            id: documentSnapshot.id
          };
        });
        setLoading(false);
        setItems(data);
      });
    return () => unsubscribe();
  }, [refresh]);



  return { items, loading, onRefresh}
}
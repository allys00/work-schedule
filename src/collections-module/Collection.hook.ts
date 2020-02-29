import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { WhereQuery } from './Collection.class';
import { useState, useEffect } from 'react';
import Collections from '../utils/collections.constants';
import { db } from '../config/firebase.config';

export function useCollections<T>(collection: Collections, queries: WhereQuery[] = []) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let consult = db.collection(collection);
    for (let query of queries) {
      consult = consult.where(query.key, query.operation, query.value) as FirebaseFirestoreTypes.CollectionReference;
    };
    const unsubscribe = consult
      .onSnapshot(querySnapshot => {
        const data: T[] = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...(documentSnapshot.data() as T),
            id: documentSnapshot.id
          };
        });

        if (loading) setLoading(false);
        setItems(data);
      });
    return () => unsubscribe();
  }, []);

  return { items, loading }
}
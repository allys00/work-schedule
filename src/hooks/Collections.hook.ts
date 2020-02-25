import { useState, useEffect } from 'react';
import firestore from "@react-native-firebase/firestore";
import Collections from '../utils/collections.constants';

export function useCollections<T>(collection: Collections) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(collection)
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
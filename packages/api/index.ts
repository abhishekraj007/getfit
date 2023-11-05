import { db } from 'app/firebase/firebaseConfig'
import { DocumentData, collection, getDocs } from 'firebase/firestore'

export const fetchWorkouts = async () => {
  const querySnapshot = await getDocs(collection(db, 'exercises'))

  const data: DocumentData[] = []

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() })
  })

  return data
}

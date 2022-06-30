import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { db } from "../firebase";

function useGetDoc(col, docId) {
    // This hook takes the column to query, and what document to find. Id used for query key

    const collectionRef = collection(db, col);
    const ref = doc(collectionRef, docId);

    const res = useFirestoreDocumentData(docId, ref, {
        subscribe: true
    })
    
  return res
}

export default useGetDoc
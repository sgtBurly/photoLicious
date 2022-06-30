import {
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

function useGetAlbums() {
    const getUserAlbums = async (userId) => {
        console.log("hook called, userId: ", userId)
		try {
			const q = query(
				collection(db, "albums/"),
				where("author", "==", userId)
			);

			let snapshot = await getDocs(q);
            console.log("snapshot in hook: ", snapshot)
            // let res = snapshot.forEach( item => item.data());
            // console.log("snapshot after foreach: ", res)
            return snapshot
		} catch (e) {
			console.error("couldn't get albums: ", e);
		}
	};

  return [
    getUserAlbums,
  ]
}

export default useGetAlbums
import {
	doc,
	setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import useUserContext from "../UserContext";

function useCreateAlbum() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isError, setIsError] = useState(false)
	const { currentUser } = useUserContext();
    const [albumUuid, setAlbumUuid] = useState(null);
    const refreshedUuid = uuidv4();

    useEffect(() => {
        setAlbumUuid(refreshedUuid)
    }, [])

    useEffect(() => {
        console.log("albumUuid create hook: ", albumUuid)
    }, [albumUuid])

    const createAlbum = async (title) => {
        setIsError(false)
        setIsLoading(true)
		const albumRef = doc(db, "albums/", albumUuid);
        console.log("AlbumUid in create Hook: ", albumUuid)
		try {
			await setDoc(albumRef, {
				title,
				author: currentUser.uid,
			});
		} catch (e) {
			setErrorMessage(`Something went wrong when creating album: ${e}` );
            setIsError(true)
		}
        setIsLoading(false)
        setIsError(false)
	};

    return [
        createAlbum,
        albumUuid,
        isLoading,
        isError,
        errorMessage,
    ]
}

export default useCreateAlbum
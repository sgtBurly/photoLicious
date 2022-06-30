import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
	collection,
	doc,
	setDoc,
	addDoc,
	addDocs,
	updateDoc,
	getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useUserContext from "../UserContext";

function useHandleData() {
	const [url, setUrl] = useState(undefined);
	const [uploadProgress, setUploadProgress] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
	const { currentUser } = useUserContext();

	const uploadImage = (images, albumId) => {
        if(!images){
            setErrorMessage("Could not detect images")
            return
        }
        setErrorMessage(null)
		setIsUploading(true);

		images.map(async (image) => {
			try {
				// Create image uuid
				const imageUuid = uuidv4();
				// Create a reference to upload the file to
				const fileRef = ref(
					storage,
					`${currentUser.uid}/${albumId}/${imageUuid}`
				);
				const uploadTask = uploadBytesResumable(fileRef, image);

				uploadTask.on(
					"state_changed",
					(uploadTaskSnapshot) => {
						console.log(
							"uploaded so far: ",
							uploadTaskSnapshot.bytesTransferred
						);
						const transferred = uploadTaskSnapshot.bytesTransferred;
						const total = uploadTaskSnapshot.totalBytes;
						setUploadProgress(Math.round((transferred / total) * 100));
					},
					(e) => {
						setErrorMessage(
							`Your file could not be processed due to the following error: ${e.message}`
						);
					},
					async () => {
						// Get url to the file
						const url = await getDownloadURL(fileRef);
						setUrl(url);
					}
				);
			} catch (e) {
				setIsUploading(false);
                setErrorMessage(e);
				console.error("Something went wrong when uploading image: ", e);
			}
			setIsUploading(false);
		});
	};

	return {
        errorMessage,
		uploadImage,
		uploadProgress,
		isUploading,
		url,
	};
}

export default useHandleData;

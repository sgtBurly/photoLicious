import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import useUserContext from "../UserContext";

export default useUploadImage = async (albumName, imageName, author) => {
	const [url, setUrl] = useState(undefined);
	const [uploadProgress, setUploadProgress] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const { currentUser } = useUserContext();

	if (!image || currentUser === null) {
		setErrorMessage("Couldn't verify images and/or user");
		return;
	}
	if (currentUser) {
		setErrorMessage(null);
		setUploadProgress(null);
		setErrorMessage(null);

		// Create a reference to upload the file to
		const fileRef = ref(storage, `albums/${albumName}/${imageName}`);
		const metaData = {
			author,
		};
		const uploadTask = uploadBytesResumable(fileRef, image, metaData);

		uploadTask.on(
			"state_changed",
			(uploadTaskSnapshot) => {
				console.log("uploaded so far: ", uploadTaskSnapshot.bytesTransferred);
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
	} else {
		console.log("no user: ", currentUser);
	}

	return [url, uploadProgress, errorMessage];
};

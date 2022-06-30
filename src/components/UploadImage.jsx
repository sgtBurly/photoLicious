import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/components/upload-image.module.scss";
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
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import useUserContext from "../UserContext";
import CreateAlbum from "./CreateAlbum";
import useUploadImage from "../custom hooks/useUploadImage";

const UploadImage = ({albumUuid}) => {
	console.log("Album UUid in upload image component", albumUuid)
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(null);
	const { currentUser } = useUserContext();
	const navigate = useNavigate();
	const [url, uploadProgress, errorMessage] = useUploadImage(albumName, image, currentUser.uuid);

	const handleImage = (e) => {
		setImageError(null);
		if (e.target.files) {
			const imageFile = e.target.files[0];
			setImage(imageFile);
			setUrl(URL.createObjectURL(imageFile));
		}
	};

	return (
		<section className={styles.uploadImage}>
			<section className={styles.uploadImage__thumbnail}>
				{url && <img src={url} alt="uploaded image thumbnail" />}
			</section>
			<form className={styles.uploadImage__form} onSubmit={handleSubmit}>
				<section className={styles.form__choseImage}>
					<input
						id="image"
						className={styles.form__input}
						type="file"
						accept="image/*"
						onChange={handleImage}
						multiple
						required
					/>
					<label htmlFor="image" className={styles.form__label}>
						Choose image
					</label>
				</section>
				<div className={styles.form__feedback}>
					{errorMessage && (
						<p className={styles["form__feedback--error"]}>{errorMessage}</p>
					)}
					{image && <p> {image.name} </p>}
				</div>
				<button className={styles.form__button}>Upload</button>
				{uploadProgress && <ProgressBar progress={uploadProgress} />}
			</form>
		</section>
	);
};

export default UploadImage;

/*
	const [url, setUrl] = useState(undefined);
	const [uploadProgress, setUploadProgress] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);


	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage(null);
		setUploadProgress(null);
		if (!image || currentUser === null) {
			return;
		}
		if (currentUser) {
			// Create a reference to upload the file to
			const fileRef = ref(storage, `images/${currentUser.uid}/${image.name}`);
			const uploadTask = uploadBytesResumable(fileRef, image);

			uploadTask.on(
				"state_changed",
				(uploadTaskSnapshot) => {
					console.log("uploaded so far: ", uploadTaskSnapshot.bytesTransferred);
					const transferred = uploadTaskSnapshot.bytesTransferred;
					const total = uploadTaskSnapshot.totalBytes;
					setUploadProgress(
						Math.round(
							uploadTaskSnapshot.bytesTransferred /
								uploadTaskSnapshot.totalBytes
						) * 100
					);
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

					// REdirect the user to their gallery
					navigate(`/gallery/${albumUuid}`);
				}
			);
		} else {
			console.log("no user: ", currentUser);
		}
	};


**/
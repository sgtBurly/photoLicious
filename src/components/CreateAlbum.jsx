import React, { useRef, useState } from "react";
import styles from "../styles/components/upload-image.module.scss";
import useCreateAlbum from "../custom hooks/useCreateAlbum";
import UploadImage from "./UploadImage";
import { PacmanLoader } from "react-spinners";

const CreateAlbum = () => {
	const albumRef = useRef();
	const [ShowUploadComponent, setShowUploadComponent] = useState(false);
	const [createAlbum, albumUuid, isLoading, isError, errorMessage] =
		useCreateAlbum();
    console.log("Album UUid in create album component", albumUuid)
    console.log("second time Album UUid in create album component", albumUuid)
    console.log("third time Album UUid in create album component", albumUuid)
	const handleSubmit = async (e) => {
		e.preventDefault();
		const albumName = albumRef.current.value;
		await createAlbum(albumName);
		setShowUploadComponent(true);
	};

	return (
		<>
			<section className={styles.form__album}>
				<form className={styles.uploadImage__form} onSubmit={handleSubmit}>
					<label htmlFor="newAlbumName" className={styles.form__label}>
						<input id="newAlbumName" type="text" ref={albumRef} />
						<button>Create New Album</button>
					</label>
					{isError && (
						<div>
							<p>{errorMessage}</p>
						</div>
					)}
					{isLoading && (
						<div>
							<PacmanLoader />
						</div>
					)}
				</form>
			</section>
			{ShowUploadComponent && (
				<section>
					<UploadImage albumUuid={albumUuid} />
				</section>
			)}
		</>
	);
};

export default CreateAlbum;

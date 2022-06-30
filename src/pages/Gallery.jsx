import React, { useEffect, useState } from "react";
import useUserContext from "../UserContext";
import useGetDoc from "../custom hooks/useGetDoc";
import { useParams } from "react-router-dom";
const Gallery = () => {
	const { currentUser } = useUserContext();
  const { docId } = useParams();

  const {albums} = useGetDoc('albums', docId);

  console.log("albums: ", albums)

	return (
		<div>
			<h1>Gallery</h1>
			<p>Current user: {currentUser.email}</p>
			{/* {
        albums.map(album => <p>{album.title}</p>)
      } */}
		</div>
	);
};

export default Gallery;

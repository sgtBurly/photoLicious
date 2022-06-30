import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import useUsercontext from "../UserContext";
import AuthModal from "./AuthModal";
import styles from "../styles/components/navbar.module.scss";

export default function Navbar() {
	const { currentUser } = useUsercontext();
	const [showModal, setShowModal] = useState(false);
  const modalRef = useRef()

	const toggleModal = () => {
        setShowModal(!showModal)
    };

	window.addEventListener("click", (e) => {
		// If the user clicks the modal, don't remove the modal
    if (modalRef.current && modalRef.current.contains(e.target)) {
		return;
	} else {
		// Only if user clicked anywhere BUT the modal, close it
		setShowModal(false);
		return;
	}
	});

	return (
		<section className={styles.navbar}>
			<Logout />
			<Link to="/gallery">Gallery</Link>
			{currentUser ? (
				<Link to="/user">Profile</Link>
			) : (
				<div className={`${styles.navbar__authmodal} 'authModal'`} ref={modalRef}>
					<button className='toggleModalBtn' onClick={() => toggleModal()}>Login</button>
					{showModal && <AuthModal />}
				</div>
			)}
		</section>
	);
}

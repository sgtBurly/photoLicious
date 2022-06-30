import React, { useState } from 'react'
import useUserContext from "../UserContext";
import styles from '../styles/pages/user-page.module.scss'
import UploadImage from '../components/UploadImage';
import CreateAlbum from '../components/CreateAlbum';

const UserPage = () => {
  const {currentUser} = useUserContext()

  return (
    <article className={styles.userPage}>
        <section className={styles.userPage__heading}>
          <h1 className={styles.heading__title}>Hello</h1>
          <h2 className={styles.heading__username}>{currentUser.email}</h2>
        </section>
        <CreateAlbum />
    </article>
  )
}

export default UserPage
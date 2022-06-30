import React from 'react';
import useUserContext from "../UserContext";

export default function Logout() {
    const { logout } = useUserContext()

    const handleLogout = async () => {
        try {
            await logout()
            console.log("succesfully logged out")
        } catch (e) {
            console.log("could log out: ", e)
        }
    }

    return (
    <button onClick={handleLogout}>Logout</button>
  )
}

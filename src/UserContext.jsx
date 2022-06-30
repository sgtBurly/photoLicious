import React, { 
		createContext, 
		useContext, 
		useEffect, 
		useState 
	} from "react";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { ref } from 'firebase/storage'
import { collection, setDoc, addDoc, doc } from "firebase/firestore";
import { db } from "./firebase"
import { PacmanLoader } from 'react-spinners';

const UserContext = createContext();

const useUserContext = () => {
	return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const currentUserRef = ref()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
				setCurrentUser(user)
				setIsLoading(false)
		})
	}, [currentUser])

	const register = async (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password).then((userObject) => {
			const userDoc = doc(db, 'users', userObject.user.uid);
			setDoc(userDoc,  {
				email,
			});
		}).catch(e => console.error("Couldn't add user to database, error: ", e))
	};
  
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const values = {
		register,
		login,
		logout,
		currentUser
	};

	return (
	<UserContext.Provider value={values}>
		{isLoading && <div><PacmanLoader /></div>}
		{!isLoading && children}
	</UserContext.Provider>
	)
};

export { 
	UserContextProvider, 
	useUserContext as default,
};

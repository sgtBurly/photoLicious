import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyA_NgvXty9Vzw3DiEY1z9iyQLpNfe0gpv8",
	authDomain: "photolicious-ccf8d.firebaseapp.com",
	projectId: "photolicious-ccf8d",
	storageBucket: "photolicious-ccf8d.appspot.com",
	messagingSenderId: "572834137542",
	appId: "1:572834137542:web:3c44aa7d6e9401f557dec7",
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize firebase auth
const auth = getAuth()

// get firebase instance 
const db = getFirestore(app);

// get firebase storage instance 
const storage = getStorage(app)

export { 
	app as default, 
	db, 
	auth,
	storage 
};

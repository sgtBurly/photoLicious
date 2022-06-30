import React, { useState } from "react";
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';

const AuthModal = () => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const toggleComponent = () => {
        setShowLogin(!showLogin)
        setShowRegister(!showRegister)
    }

    return (
		<div>
			{" "}
			<div>{showLogin && <LoginComponent />}</div>
			<div>{showRegister && <RegisterComponent />}</div>
			<div>
				<button onClick={toggleComponent}>{showRegister ? "Already photolicious?" : "Become photolicious!"}</button>
			</div>
		</div>
	);
};

export default AuthModal;

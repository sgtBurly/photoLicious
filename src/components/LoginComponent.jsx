import React, { useRef } from "react";
import { useState } from "react";
import styles from "../styles/components/register.module.scss";
import useUserContext from "../UserContext";

const LoginComponent = () => {
	// From references:
	const emailRef = useRef();
	const pwRef = useRef();
	// Input state vars:
	const [loading, setLoading] = useState(false);
	// Feedback messages
	const [feedbackMessage, setFeedbackMessage] = useState(null);
	// Implement context hook
	const { login, currentUser } = useUserContext();

	const handleLogin = async (e) => {
		e.preventDefault();

		setLoading(true);
		try {
			await login(emailRef.current.value, pwRef.current.value);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setFeedbackMessage(e.message)
		}
	};

	return (
		<>
			<div>
				<h2>Login: </h2>
				<form onSubmit={handleLogin}>
					<input
						className={"input"}
						placeholder="Email"
						type="email"
						// onChange={(e) => setEmail(e.target.value)}
						ref={emailRef}
						required
					/>
					<input
						className={"input"}
						placeholder="Password"
						type="password"
						// onChange={(e) => setPassword(e.target.value)}
						ref={pwRef}
						required
					/>
					<div className={styles.feedbackMessage}>
						{feedbackMessage}
					</div>
					<div className={styles.registerBtn}>
						<button disabled={loading} className={"button"}>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginComponent;

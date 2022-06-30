import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/register.module.scss";
import useUserContext from "../UserContext";

const RegisterComponent = () => {
	// Implement context hook
	const { register, login } = useUserContext();

	// Form references:
	const emailRef = useRef();
	const pwRef = useRef();
	const pwRepeatRef = useRef();

	// Implement navigate
	const navigate = useNavigate();

	// Input state vars:
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [passwordCheck, setPasswordCheck] = useState(false);
	const [buttonState, setButtonState] = useState(true); // Used to disable form button

	// Feedback message
	const [regexMessage, setRegexMessage] = useState(null);

	// Check password with Regex
	const checkPassword = () => {
		const pw = pwRef.current?.value;
		const pwRepeat = pwRepeatRef.current?.value;
		// Declare regex for pw check. At least 6 chars long, upper/lower case and at least one special character
		const regex = new RegExp(
			"^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"
		);
		if (pw === pwRepeat && regex.test(pw)) {
			setPasswordCheck(true);
			setRegexMessage(null);
			setButtonState(false);
		} else if (!regex.test(pw)) {
			setRegexMessage(
				"Must contain at least 6 characters, upper/lower case and a special character"
			);
		} else if (pw !== pwRepeat) {
			setRegexMessage("The passwords don't match");
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const pw = pwRef.current.value;

		if (passwordCheck) {
			try {
				setLoading(true);
				console.log("logging register func:", await register(email, pw));
				login(email, pw);
				navigate("/user");
				setLoading(false);
			} catch (e) {
				setLoading(false);
				setError(e);
			}
		}
	};

	return (
		<>
			<div>
				<h2>Register: </h2>
				<form onSubmit={handleRegister}>
					<input
						className={"input"}
						placeholder="Email"
						type="email"
						ref={emailRef}
						required
					/>
					<input
						className={"input"}
						placeholder="Password"
						type="password"
						ref={pwRef}
						onChange={() => checkPassword()}
						required
					/>
					<input
						className={"input"}
						placeholder="Repeat password"
						type="password"
						onChange={() => checkPassword()}
						ref={pwRepeatRef}
						required
					/>
					<div className={styles.feedbackMessage}>{regexMessage}</div>

					<div className={styles.registerBtn}>
						<button disabled={buttonState} className={"button"}>
							Create account
						</button>
					</div>
				</form>
				<div>{error && <p>Somthing went wrong: {error.message}</p>}</div>
			</div>
		</>
	);
};

export default RegisterComponent;

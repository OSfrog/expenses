import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../UI/Button";
import Input from "../UI/Input";

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

	const {
		email: emailIsInvalid,
		confirmEmail: emailsDontMatch,
		password: passwordIsInvalid,
		confirmPassword: passwordsDontMatch,
	} = credentialsInvalid;

	function updateInputValueHandler(inputType, enteredValue) {
		switch (inputType) {
			case "email":
				setEnteredEmail(enteredValue);
				break;
			case "confirmEmail":
				setEnteredConfirmEmail(enteredValue);
				break;
			case "password":
				setEnteredPassword(enteredValue);
				break;
			case "confirmPassword":
				setEnteredConfirmPassword(enteredValue);
				break;
		}
	}

	function submitHandler() {
		onSubmit({
			email: enteredEmail,
			confirmEmail: enteredConfirmEmail,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
		});
	}

	return (
		<View style={styles.form}>
			<View>
				<Input
					label="Email Address"
					textInputConfig={{
						onChangeText: updateInputValueHandler.bind(this, "email"),
						value: enteredEmail,
						autoCapitalize: "none",
						autoCorrect: false,
						keyboardType: "email-address",
					}}
					invalid={emailIsInvalid}
				/>
				{!isLogin && (
					<Input
						label="Confirm Email Address"
						invalid={emailsDontMatch}
						textInputConfig={{
							value: enteredConfirmEmail,
							onChangeText: updateInputValueHandler.bind(this, "confirmEmail"),
							autoCapitalize: "none",
							autoCorrect: false,
							keyboardType: "email-address",
						}}
					/>
				)}
				<Input
					label="Password"
					textInputConfig={{
						onChangeText: updateInputValueHandler.bind(this, "password"),
						secureTextEntry: true,
						autoCapitalize: "none",
						autoCorrect: false,
						value: enteredPassword,
					}}
					invalid={passwordIsInvalid}
				/>
				{!isLogin && (
					<Input
						label="Confirm Password"
						textInputConfig={{
							onChangeText: updateInputValueHandler.bind(
								this,
								"confirmPassword"
							),
							autoCapitalize: "none",
							autoCorrect: false,
							secureTextEntry: true,
							value: enteredConfirmPassword,
						}}
						invalid={passwordsDontMatch}
					/>
				)}
				<View style={styles.buttons}>
					<Button onPress={submitHandler}>
						{isLogin ? "Log In" : "Sign Up"}
					</Button>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttons: {
		marginTop: 12,
	},
});

export default AuthForm;

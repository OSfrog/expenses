import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const FlatButton = ({ children, onPress }) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<View>
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 6,
		paddingHorizontal: 12,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		textAlign: "center",
		color: GlobalStyles.primary100,
	},
});

export default FlatButton;

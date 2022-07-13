import { FlatList, StyleSheet, View } from "react-native";

import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = ({ item }) => {
	return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }) => {
	return (
		<View>
			<FlatList
				data={expenses}
				renderItem={renderExpenseItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default ExpensesList;

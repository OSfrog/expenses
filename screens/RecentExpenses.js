import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const { token } = useContext(AuthContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const getExpenses = async () => {
    const expenses = await fetchExpenses(token);
    setExpenses(expenses);
  };

  useEffect(() => {
    const getExpensesInEffect = async () => {
      setIsFetching(true);
      try {
        await getExpenses();
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    };

    getExpensesInEffect();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;

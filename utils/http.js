import axios from "axios";

const baseURL =
  "https://expenses-5312f-default-rtdb.europe-west1.firebasedatabase.app/";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(baseURL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async (token) => {
  const response = await axios.get(baseURL + `/expenses.json?auth=${token}`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(baseURL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(baseURL + `/expenses/${id}.json`);
};

import { API_URL } from "../utility/common";

const userId =localStorage.getItem("isUserId");
console.log(userId);

const getExpense = async () => {
  try {
    const req = await fetch(`${API_URL}/expense?userId=${localStorage.getItem("isUserId")}`, {
      method: "get",
            credentials: "include",

      headers: {
        "content-type": "application/json",
      }
        });
    const res = await req.json();
 if(!req.ok){
      return  new Error(e);
    }
    return res.data;
  } catch (e) {
    throw new Error(e);
  }
};

const getExpenseChartData = async () => {
  try {
    const req = await fetch(`${API_URL}/summary/byCategory?userId=${localStorage.getItem("isUserId")}`, {
      method: "get",
            credentials: "include",

      headers: {
        "content-type": "application/json",
      }
        });
    const res = await req.json();
    if(!req.ok){
      return  new Error(e);
    }
    console.log(res);

    return res;
  } catch (e) {
    throw new Error(e);
  }
};
const getAllExpenseValue = async () => {
  try {
    const req = await fetch(`${API_URL}/summary/getExpenseAmount?userId=${localStorage.getItem("isUserId")}`, {
      method: "get",
            credentials: "include",

      headers: {
        "content-type": "application/json",
      }    
        });
    const res = await req.json();
 if(!req.ok){
      return  new Error(e);
    }
    return res;
  } catch (e) {
    throw new Error(e);
  }
};

const createExpense = async (reqData) => {
  try {
    const req = await fetch(`${API_URL}/expense`, {
      method: "POST",
            credentials: "include",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const res = await req.json();
     if(!req.ok){
      return  new Error(e);
    }
    return res.data;
  } catch (e) {
    throw new Error(e);
  }
};

const getLastTxn = async () => {
  try {
    const req = await fetch(`${API_URL}/summary/getExpenseTxn?userId=${localStorage.getItem("isUserId")}`, {
      method: "get",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
        });
    const res = await req.json();
 if(!req.ok){
      return  new Error(e);
    }
    return res.data;
  } catch (e) {
    throw new Error(e);
  }
};
export { getExpense, createExpense,getAllExpenseValue,getLastTxn,getExpenseChartData};

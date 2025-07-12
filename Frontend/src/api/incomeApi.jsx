import { API_URL } from "../utility/common";

const getIncome = async (searchTerm) => {
  try {
    const userId =localStorage.getItem("isUserId");

    const req = await fetch(`${API_URL}/income?userId=${userId}&source=${searchTerm}`, {
      method: "get",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
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

const createIncome = async (reqData) => {
  try {
    const req = await fetch(`${API_URL}/income`, {
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

export { getIncome, createIncome };

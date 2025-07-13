import { API_URL } from "../utility/common";

const getCategory = async () => {
  try {
    const req = await fetch(`${API_URL}/category`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
      credentials:"include"
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
const getAllCategory = async () => {
  try {
    const req = await fetch(`${API_URL}/category/all`, {
      method: "get",
      credentials:"include",
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

const createCategory = async (reqData) => {
  try {
    const req = await fetch(`${API_URL}/category`, {
      method: "POST",
      credentials:"include",
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


export { getCategory, createCategory ,getAllCategory};

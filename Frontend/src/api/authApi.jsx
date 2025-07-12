import { API_URL } from "../utility/common";

export const athuApi  =async(url,reqBody) =>{   
    try{
       let data  =await fetch(API_URL+url,{
        method:'POST',
       credentials: 'include', // ✅ correct way to send cookies
      headers: {
        'Content-Type': 'application/json'
      }, 
        body:JSON.stringify(reqBody)
       });
       let result =await data.json();
        if(!data.ok){
      return  new Error(e);
    }
       return result;
    }catch(e){
      return e;
    }
}
// common.js
export const API_URL = import.meta.env.VITE_API_URL;

// api.js
export const athuApi = async (url, reqBody) => {
  try {
    const response = await fetch(API_URL + url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "API Error");
    }

    return result;

  } catch (e) {
    console.error("API Error:", e);
    return e;
  }
};

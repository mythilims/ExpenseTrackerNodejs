import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LayOut from "./Layouts/LayOut";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
const getStoredBool = (key) => localStorage.getItem(key) === "true";
const getStoredValue = (key) => localStorage.getItem(key) || "";

// State for auth and userId
const [isAuthenticated, setIsAuthenticated] = useState(() => getStoredBool("isAuthenticated"));
const [isUserId, setUserId] = useState(() => getStoredValue("isUserId"));

// Sync localStorage on state change
useEffect(() => {
  localStorage.setItem("isAuthenticated", isAuthenticated);
  localStorage.setItem("isUserId", isUserId);
}, [isAuthenticated, isUserId]);

console.log(isAuthenticated, isUserId,'isAuthenticated, isUserId')
  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login setAuth={setIsAuthenticated} setUserId={setUserId} />} />


        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} isUserId={isUserId}>
              <LayOut />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: "",
    duration: 5000,
    style: {
      background: "white",
      color: "black",
      fontWeight:'bold'
    },
  }}
/>
</>
  );
}

export default App;

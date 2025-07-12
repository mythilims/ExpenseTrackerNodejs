// Layout.jsx - Main layout with responsive sidebar
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Main from "./Main";
import Category from "../pages/Category";
import Income from "../pages/Income";
import Expense from "../pages/Expense";
import { LogIn } from "lucide-react";
import Login from "../pages/Login";
import { useState } from "react";

function LayOut() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area with responsive padding */}
      <div className="flex flex-1 pt-16">
        {/* Responsive Sidebar */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area with responsive padding */}
         {/* lg:pr-4 lg:pl-[200px]  */}
        <div className="flex-1 flex flex-col px-4 
       ">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/metadata/category" element={<Category />} />
            <Route path="/metadata/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>

          <div className="mt-auto">{/* <Footer /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default LayOut
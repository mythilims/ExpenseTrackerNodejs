
// Sidebar.jsx - Responsive sidebar with mobile overlay
import { useState } from "react";
import { Home, DollarSign, TrendingUp, Grid, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function SideBar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/metadata/income", label: "Income", icon: TrendingUp },
    { path: "/expense", label: "Expense", icon: DollarSign },
    { path: "/metadata/category", label: "Category", icon: Grid },
    { path: "/login", label: "Logout", icon: LogOut },

  ];

  const handleMenuClick = (e) => {
    console.log(e);
    
    // Close sidebar on mobile when menu item is clicked
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    if(e.nativeEvent.target.innerText==='Logout'){
     localStorage.clear();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
    <div
  className={`
    fixed top-16 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
    overflow-y-auto h-[calc(100vh-4rem)]  // Added height for scroll
    lg:translate-x-0 lg:static lg:z-auto lg:w-[200px] lg:h-auto
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleMenuClick}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? "bg-sky-100 text-sky-700 border-r-4 border-sky-500" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
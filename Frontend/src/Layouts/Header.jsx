// Header.jsx - Responsive header with hamburger menu
import { HandCoins, Menu, X } from "lucide-react";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-sky-500 via-sky-500 to-sky-500 p-4 shadow-lg text-xl font-semibold text-white fixed w-full z-50 top-0">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <HandCoins className="w-6 h-6 text-yellow-300" />
        <p className="hidden sm:block">Expense Tracker</p>
        <p className="block sm:hidden">Tracker</p>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 rounded-md hover:bg-sky-600 transition-colors"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}

export default Header;
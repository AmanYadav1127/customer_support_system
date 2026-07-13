import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ onLogout }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm z-10">
        <div>
          {/* Brand/Logo */}
          <div className="h-16 flex items-center px-8 border-b border-gray-100 mb-6">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
              Customer Support
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col px-4 space-y-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Home
            </NavLink>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
              Tickets
            </NavLink>
          </nav>
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

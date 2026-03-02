import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";




const Navbar = () => {
  const { isLoggedIn, username, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const handleLogout = ()=>{
    logout(); //context logout
    setShowLogoutModal(false);
    navigate("/")
  }


  return (
    <header className="relative z-50 w-full border-b border-white/5 glass">
      <div className="flex justify-between items-center px-6 sm:px-10 md:px-16 py-6 max-w-[1200px] mx-auto">
        <Link to="/" className="text-2xl font-extrabold select-none">
          <span className="text-[#d95a8a]">Link</span>
          <span className="text-[#5a5de0]">ly</span>
          <sup className="text-gray-400 text-xs">®</sup>
        </Link>

        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/5 px-3 py-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                </span>
                <span className="text-[11px] font-medium tracking-wide text-emerald-200">
                  Signed in as <span className="text-white">{username}</span>
                </span>
              </div>
              <button
                onClick={()=> setShowLogoutModal(true)}
                className="inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-indigo-500"
              >
                <span>Sign Out</span>
                <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-indigo-500"
            >
              <span>Sign In</span>
              <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          )}
        </nav>
      </div>
      {showLogoutModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl">
      
      <h3 className="text-white text-lg font-semibold mb-2">
        Are you sure?
      </h3>

      <p className="text-gray-400 text-sm mb-6">
        You will be logged out of your account.
      </p>

      <div className="flex justify-center gap-3">
        
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 rounded-full border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full bg-red-500/90 text-white text-sm hover:bg-red-500 transition"
        >
          Yes, Logout
        </button>

      </div>
    </div>
  </div>
)}
    </header>
  );
};

export default Navbar;

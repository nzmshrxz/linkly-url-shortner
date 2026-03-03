import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Api from "./pages/Api";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import RedirectHandler from "./pages/RedirectHandler";
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Toaster position = "top-right"/>
      <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">

        {/* 🔥 Premium top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-indigo-600 blur-[160px] rounded-full"></div>
        </div>
        

        {/* subtle radial atmosphere */}
        <div className="[background:radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_60%)] absolute inset-0 pointer-events-none"></div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<DashboardPage/>}/>
              {/* Short URL handler – captures /:shortid on Netlify and forwards to backend */}
              <Route path="/:shortid" element={<RedirectHandler />} />
              <Route path="/privacy" element={<Privacy/>}/>
              <Route path="/terms" element={<Terms/>}/>
              <Route path="/api" element={<Api/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
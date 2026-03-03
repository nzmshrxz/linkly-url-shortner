import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Sparkles, AlertCircle, Check, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import UserLinks from "../components/UserLinks";
import { AuthContext } from "../context/AuthContext";




export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [links, setLinks] = useState([]);
  const [remaining, setRemaining] = useState(5);
  const [showToast, setShowToast] = useState(false)


  const { isLoggedIn, token, username } = useContext(AuthContext)




  // Fetch user links if logged in
  const fetchLinks = async () => {
    if (!token) return; // guest user
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shorten/my-links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLinks();
    } else {
      setLinks([]); // important: clear on logout
    }
  }, [token]);




  // Handle URL submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token && remaining <= 0) {
      setError("Guest limit reached. Please sign in for unlimited links.")
      return
    }
    setShortUrl("");
    setUrl("");
    setError("");

    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/shorten`,
        { url },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );

      setShortUrl(res.data.shortUrl);

      if (token) {
        fetchLinks();
      } else {
        setRemaining((prev) => prev - 1);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to shorten URL");
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError("Failed to copy");
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto px-15 sm:px-10 md:px-16 mt-10 text-center">
      {/* Header */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
        style={{ willChange: "transform" }}
        animate={{ y: [0, -8] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: [0.4, 0, 0.2, 1],
        }}
      >

        {/* new feature sparkles addition */}
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">New: Smart Alias Generation</span>
      </motion.div>


      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
        Shorten Your <br className="hidden md:block" />
        Looooong Links.
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-md mx-auto">
        Linkly is an efficient and easy-to-use URL shortening service that streamlines your online
        experience.
      </p>

      {/* URL Form */}
      <div className="mt-8 max-w-lg mx-auto relative">
        {/* Animated gradient glow */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full blur-xl opacity-60"
          style={{
            willChange: "transform, background-position",
            backgroundImage:
              "linear-gradient(90deg, rgba(30,75,255,0.0), rgba(30,75,255,0.75), rgba(217,90,138,0.55), rgba(90,93,224,0.6), rgba(30,75,255,0.0))",
            backgroundSize: "300% 100%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-[#1a1f2f] rounded-2xl px-4  py-3 shadow-[0_0_15px_rgba(30,75,255,0.35)] flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-2 flex-1">
            <i className="fas fa-link text-gray-400 text-lg"></i>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow bg-transparent text-gray-300 placeholder-gray-500 text-sm focus:outline-none"
              placeholder="Enter the link here"
              type="text"
            />
          </div>
          <button
            disabled={!token && remaining <= 0}
            type="submit"
            className={`inline-flex mt-2 cursor-pointer sm:mt-0 items-center justify-center rounded-full
    ${!token && remaining <= 0 ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"}
    bg-gradient-to-r  from-[#4a6aff] via-[#5a5de0] to-[#d95a8a]
    px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)]
  `}
          >
            Shorten Now
          </button>
        </form>
      </div>

      {/* Display short URL or error */}
      {error && (
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-[11px] font-medium text-red-200 shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur">
            <AlertCircle className="h-3.5 w-3.5 text-red-400" />
            <span>{error}</span>
          </div>
        </div>
      )}
      {shortUrl && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-blue-400 underline">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-indigo-500"
          >
            <Check className="h-3 w-3" />
            <span>Copy</span>
          </button>

        </div>

      )}

      {/* Guest links info */}
      {!isLoggedIn ? (
        <p className="text-gray-400 text-xs mt-6 max-w-md mx-auto">
          You can create{" "}
          <span className="text-[#d95a8a] font-semibold">{remaining}</span> more links.{" "}
          <Link className="underline hover:text-[#1e4bff]" to="/auth">
            Register Now
          </Link>{" "}
          to enjoy unlimited usage.
          <i className="fas fa-question-circle text-gray-400 ml-1"></i>
        </p>
      ) : (
        <p className="text-gray-400 text-xs mt-6 max-w-md mx-auto">
          You can now create <span className="text-[#1e4bff] font-semibold">unlimited links</span> 🎉
        </p>
      )}

      {/* Dashboard link and user links – only when logged in */}
      {isLoggedIn && (
        <>
          <div className="flex justify-center mt-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-medium group"
            >
              <LayoutDashboard
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
              <span>Go to Dashboard</span>
            </Link>
          </div>

          <UserLinks links={links} setLinks={setLinks} />
        </>
      )}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}

            className="fixed bottom-6 right-6 z-50">
            <div className="bg-green-500/10 border flex gap-2 items-center border-green-500/30 text-green-300 px-4 py-2 rounded-full text-xs backdrop-blur shadow-lg">
              <Check size={14} /> Copied to clipboard
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

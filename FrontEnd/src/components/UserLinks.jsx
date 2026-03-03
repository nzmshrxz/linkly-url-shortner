import axios from "axios";
import React, { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const UserLinks = ({ links, setLinks }) => {
  console.log("links:", links);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showToast, setShowToast] = useState(false)

  if (!links || links.length === 0) {
    return <p className="mt-4 text-gray-400">You have no links yet.</p>;
  }

  const handleCopy = async (shortUrl, id) => {
    try{
      await navigator.clipboard.writeText(shortUrl);
      setShowToast(true);

      //auto hide after 2 seconds
      setTimeout(()=> setShowToast(false), 2000);
    } catch (error) {
      console.log(error.message);
      alert("Failed to copy");
    }
  };


  const handleDelete = async (shortid) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shorten/${shortid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLinks((prev) => prev.filter((link) => link.shortid !== shortid));
    } catch (error) {
      console.log(error.message);
      alert("Failed to delete");
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mt-6 max-w-xxl mx-auto p-5 rounded-xl text-left">
      <h3 className="text-xl text-center font-semibold mb-3 text-white">Your Links</h3>
      <ul className="space-y-3">
        {links.slice(0, visibleCount).map((link) => (
          <li
            key={link.shortid}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-transparent backdrop-blur-3xl px-5 py-3 rounded-lg border border-white/5"
          >
            <div className="flex flex-col min-w-0">
              <a
                href={`${import.meta.env.VITE_REACT_APP_API_URL}/${link.shortid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a6aff] underline break-all"
              >
                {`${import.meta.env.VITE_REACT_APP_API_URL}/${link.shortid}`}
              </a>
              <span className="text-gray-300 text-sm break-words">
                {link.redirectUrl}
              </span>
              <span className="text-gray-400 text-xs">
                Created at: {new Date(link.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex space-x-2 sm:mt-0">
              <button
                onClick={() =>
                  handleCopy(`${import.meta.env.VITE_REACT_APP_API_URL}/${link.shortid}`)
                }
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-indigo-500"
              >
                <Check className="h-3 w-3" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => handleDelete(link.shortid)}
                className="inline-flex items-center gap-1 rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold text-red-200 shadow-[0_10px_25px_rgba(0,0,0,0.55)] transition hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-red-500"
              >
                <Trash2 className="h-3 w-3" />
                <span>Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {visibleCount < links.length && (
        <div className="mt-4 text-center">
          <button
            onClick={handleViewMore}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:ring-indigo-500"
          >
            View More
          </button>
        </div>
      )}
      <AnimatePresence>
      {showToast && (
  <motion.div
    initial={{opacity:0 , y:20}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0 , y:20}}

   className="fixed bottom-6 right-6 z-50">
    <div className="bg-green-500/10 border flex gap-2 items-center border-green-500/30 text-green-300 px-4 py-2 rounded-full text-xs backdrop-blur shadow-lg">
      <Check size={14}/> Copied to clipboard
    </div>
    </motion.div>
)}
</AnimatePresence>
    </div>
  );
};

export default UserLinks;

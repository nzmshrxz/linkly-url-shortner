import {
  Copy,
  Trash2,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  BarChart3,
  X,
  MousePointerClick,
  Calendar,
  Link2,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Dashboard({ links = [], onDelete }) {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  // Frontend base URL (Netlify in production, localhost in dev)
  const frontendBaseUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin.replace(/\/+$/, "");
  }, []);

  const buildShortUrl = (shortid) =>
    `${frontendBaseUrl}/${shortid}`;

  const handleCopy = (text, shortid) => {
    navigator.clipboard.writeText(text);
    setCopiedId(shortid);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (!url) return "";
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getClicks = (link) => link?.visitedAt?.length ?? 0;

  const totalClicks = links.reduce((acc, l) => acc + getClicks(l), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 min-h-screen text-gray-100 p-4 md:p-8 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Shortener</span>
            </button>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#4a6aff] via-[#5a5de0] to-[#d95a8a] bg-clip-text text-transparent">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2 text-base">
              Manage your shortened links and track performance.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                Total Links
              </p>
              <p className="text-2xl font-mono font-bold text-[#4a6aff]">
                {links.length}
              </p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                Total Clicks
              </p>
              <p className="text-2xl font-mono font-bold text-[#d95a8a]">
                {totalClicks}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#4a6aff]/20 to-[#d95a8a]/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f14]/60 backdrop-blur-2xl shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.03]">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Original URL
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Short URL
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Created
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Clicks
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Expiry
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {links.length === 0 ? (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <td
                          colSpan={6}
                          className="px-6 py-20 text-center text-gray-500"
                        >
                          <Link2 className="mx-auto mb-3 h-12 w-12 text-gray-600" />
                          <p className="font-medium">No links yet</p>
                          <p className="text-sm mt-1">
                            Start shortening URLs on the home page to see them here.
                          </p>
                        </td>
                      </motion.tr>
                    ) : (
                      links.map((link) => (
                        <motion.tr
                          layout
                          key={link.shortid}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="hover:bg-white/[0.03] transition-colors group/row"
                        >
                          <td className="px-6 py-5">
                            <span className="text-gray-300 font-medium truncate max-w-[280px] block">
                              {truncateUrl(link.redirectUrl)}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-sm font-bold text-[#4a6aff]">
                                {buildShortUrl(link.shortid)}
                              </span>
                              <button
                                onClick={() =>
                                  handleCopy(buildShortUrl(link.shortid), link.shortid)
                                }
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-[#4a6aff]/20 text-gray-400 hover:text-[#4a6aff] transition-all"
                              >
                                {copiedId === link.shortid ? (
                                  <CheckCircle2 size={16} />
                                ) : (
                                  <Copy size={16} />
                                )}
                              </button>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar size={14} />
                              {formatDate(link.createdAt)}
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <button
                              onClick={() => setSelectedLink(link)}
                              className="inline-flex items-center gap-2 rounded-full border border-[#4a6aff]/30 bg-[#4a6aff]/10 px-3 py-1.5 text-xs font-medium text-[#4a6aff] hover:bg-[#4a6aff]/20 transition-colors"
                            >
                              <MousePointerClick size={14} />
                              {getClicks(link)} clicks
                            </button>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`text-sm font-mono ${link.timeLeft === "Expired"
                                  ? "text-red-400"
                                  : link.timeLeft === "No expiry"
                                    ? "text-gray-500"
                                    : "text-emerald-400"
                                }`}
                            >
                              {link.timeLeft || "No expiry"}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2">
                              <a
                                href={buildShortUrl(link.shortid)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-gray-400 hover:text-[#d95a8a] hover:bg-[#d95a8a]/10 transition-all"
                              >
                                <ExternalLink size={18} />
                              </a>
                              <button
                                onClick={() => onDelete?.(link.shortid)}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Modal */}
      <AnimatePresence>
        {selectedLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLink(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f14] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#4a6aff]" />
                  <h3 className="text-lg font-semibold text-white">
                    Link Analytics
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLink(null)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                    Short URL
                  </p>
                  <p className="text-sm font-mono text-[#4a6aff] break-all">
                    {buildShortUrl(selectedLink.shortid)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                    Original URL
                  </p>
                  <p className="text-sm text-gray-300 truncate">
                    {selectedLink.redirectUrl}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                    Total Clicks
                  </p>
                  <p className="text-2xl font-bold text-[#d95a8a]">
                    {getClicks(selectedLink)}
                  </p>
                </div>
                {selectedLink.visitedAt?.length > 0 ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                      Click History
                    </p>
                    <div className="max-h-48 overflow-y-auto space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      {[...(selectedLink.visitedAt || [])]
                        .reverse()
                        .slice(0, 20)
                        .map((visit, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-xs text-gray-400"
                          >
                            <span>
                              {formatDate(visit.timestamp)} at{" "}
                              {formatTime(visit.timestamp)}
                            </span>
                          </div>
                        ))}
                      {(selectedLink.visitedAt?.length || 0) > 20 && (
                        <p className="text-xs text-gray-500 pt-2">
                          + {(selectedLink.visitedAt?.length || 0) - 20} more
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No clicks recorded yet.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

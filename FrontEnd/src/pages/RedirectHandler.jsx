import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function RedirectHandler() {
  const { shortid } = useParams();

  useEffect(() => {
    if (!shortid) return;

    // Forward to backend redirect endpoint hosted on Render
    const target = `${API_BASE_URL}/${shortid}`;
    window.location.replace(target);
  }, [shortid]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-400">Redirecting you to your destination...</p>
        <p className="text-xs text-gray-600">
          If this takes too long, please check your connection or try again later.
        </p>
      </div>
    </div>
  );
}


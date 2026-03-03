import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Dashboard from '../components/Dashboard'

export default function DashboardPage() {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    const fetchLinks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/shorten/my-links`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setLinks(res.data || [])
      } catch (error) {
        console.log(error.response?.data)
      } finally {
        setLoading(false)
      }
    }
    fetchLinks()
  }, [token])

  useEffect(() => {
    const interval  = setInterval(() => {
      setNow(Date.now())
    }, 1000);
  
    return () => clearInterval(interval)
  }, [])
  

  useEffect(() => {
    if (!token && !loading) {
      navigate('/auth')
    }
  }, [token, loading, navigate])

  const handleDelete = async (shortid) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shorten/${shortid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLinks((prev) => prev.filter((l) => l.shortid !== shortid))
    } catch (err) {
      console.log(err.response?.data)
    }
  }

function getTimeLeft(expiry) {
  if (!expiry) return "No expiry";

  const diff = new Date(expiry) - now;

  if (diff <= 0) return "Expired";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}
const linksWithCountdown = links.map(link => ({
  ...link,
  timeLeft: getTimeLeft(link.expiresAt)
}));


  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#4a6aff] border-t-transparent" />
          <p className="text-gray-400">Loading your links...</p>
        </div>
      </div>
    )
  }

  if (!token) return null

  return <Dashboard links={linksWithCountdown} onDelete={handleDelete} />
}

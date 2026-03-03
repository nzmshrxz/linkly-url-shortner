import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Footer = () => {

  return (
    <footer className="mt-16 py-12 border-t border-white/5 text-center">
      <div className="flex items-center justify-center gap-6 mb-4">
        <Link to="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</Link>
        <Link to="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</Link>
        <Link to="/api" className="text-sm text-gray-500 hover:text-white transition-colors">API</Link>
      </div>
      <p className="text-xs text-gray-600">© 2025 Linkly Labs. Crafted for the modern web by Nazam Shiraz.</p>
    </footer>
  )
}

export default Footer
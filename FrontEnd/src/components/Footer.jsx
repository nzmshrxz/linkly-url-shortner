import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-16 py-12 border-t border-white/5 text-center">
      <div className="flex items-center justify-center gap-6 mb-4">
        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</a>
        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</a>
        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">API</a>
      </div>
      <p className="text-xs text-gray-600">© 2025 Linkly Labs. Crafted for the modern web by Nazam Shiraz.</p>
    </footer>
  )
}

export default Footer
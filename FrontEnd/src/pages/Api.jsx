import React from 'react'

export default function Api() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16">

      <div className="w-full max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Linkly · Developers</p>
        <h1 className="font-bold text-4xl sm:text-5xl leading-tight mb-4">API Access</h1>
        <p className="text-sm leading-relaxed opacity-60 max-w-lg">
          Programmatic access to Linkly — shorten links, fetch stats, and manage your URLs
          directly from your own apps and workflows.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 border rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-pulse" />
          <span className="text-xs uppercase tracking-widest opacity-40">Coming soon</span>
        </div>
      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mb-16" />

      <div className="w-full max-w-2xl flex flex-col gap-12">

        {/* Planned endpoints */}
        <div>
          <h2 className="font-semibold text-base uppercase tracking-widest mb-3 opacity-50">Planned endpoints</h2>
          <div className="flex flex-col gap-3">
            {[
              { method: 'POST', path: '/api/shorten', desc: 'Submit a long URL and receive a shortened link.' },
              { method: 'GET',  path: '/api/links',   desc: 'Fetch all links associated with your account.' },
              { method: 'GET',  path: '/api/stats/:id', desc: 'Retrieve click analytics for a specific link.' },
              { method: 'DELETE', path: '/api/links/:id', desc: 'Permanently delete a link from your account.' },
            ].map(({ method, path, desc }) => (
              <div key={path} className="flex items-start gap-4 text-sm">
                <span className="font-mono font-bold text-xs mt-0.5 opacity-40 w-14 shrink-0">{method}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs opacity-70">{path}</span>
                  <span className="opacity-40 text-xs">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth */}
        <div>
          <h2 className="font-semibold text-base uppercase tracking-widest mb-3 opacity-50">Authentication</h2>
          <ul className="flex flex-col gap-2">
            {[
              "API keys will be issued per account from your dashboard — no OAuth complexity.",
              "Keys are passed via the Authorization header as a Bearer token.",
              "Rate limits will apply to keep the service fair for everyone.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-1 text-xs opacity-40">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notify */}
        <div>
          <h2 className="font-semibold text-base uppercase tracking-widest mb-3 opacity-50">Get notified</h2>
          <ul className="flex flex-col gap-2">
            {[
              "The API is not available yet — it's planned for a future release.",
              "If you have a specific use case in mind, reach out. Your feedback shapes what gets built first.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-1 text-xs opacity-40">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mt-16 mb-8" />
      <p className="text-xs opacity-30 text-center max-w-md leading-relaxed">
        Built by Nazam Shiraz. The API will be documented here in full once it launches.
      </p>

    </div>
  )
}
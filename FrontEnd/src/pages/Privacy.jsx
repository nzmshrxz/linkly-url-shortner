import React from 'react'

const Section = ({ title, items }) => (
  <div className="w-full max-w-2xl">
    <h2 className="font-semibold text-base uppercase tracking-widest mb-3 opacity-50">{title}</h2>
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
          <span className="mt-1 text-xs opacity-40">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16">

      {/* Header */}
      <div className="w-full max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Linkly · Legal</p>
        <h1 className="font-bold text-4xl sm:text-5xl leading-tight mb-4">Privacy Policy</h1>
        <p className="text-sm leading-relaxed opacity-60 max-w-lg">
          We built Linkly to be useful, fast, and private. This page explains what we collect,
          what we don't, and why you can trust us with your links.
        </p>
        <p className="text-xs opacity-30 mt-4">Last updated · March 2026</p>
      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mb-16" />

      <div className="w-full max-w-2xl flex flex-col gap-12">

        <Section
          title="What we collect"
          items={[
            "The destination URL you submit when creating a short link.",
            "Basic click analytics — how many times your short link was visited.",
            "Your email address if you create an account, used only for login and account recovery.",
            "General metadata like timestamps and browser type for debugging and performance.",
          ]}
        />

        <Section
          title="What we never collect"
          items={[
            "We never store your passwords in readable form. Passwords are hashed using industry-standard bcrypt — not even our engineers can see them.",
            "We do not read, scan, or log the destination URLs you shorten beyond what's needed to redirect visitors.",
            "We do not sell, rent, or share your data with any third-party advertisers. Ever.",
            "We do not build behavioral profiles or track you across the web.",
            "We do not use your links for training AI models or any other secondary purpose.",
          ]}
        />

        <Section
          title="Your links are yours"
          items={[
            "Short links you create are private by default — no one can browse or discover them unless they have the exact URL.",
            "You can delete any link you've created at any time, which immediately deactivates it.",
            "If you delete your account, all your links and associated data are permanently removed within 30 days.",
            "We don't expose your original URLs to visitors — they only see the shortened version.",
          ]}
        />

        <Section
          title="Security"
          items={[
            "All data is transmitted over HTTPS / TLS. No exceptions.",
            "Passwords are salted and hashed before storage. We have no way to recover them in plain text.",
            "We regularly audit access controls to ensure only authorised systems can touch user data.",
            "In the unlikely event of a breach, affected users will be notified promptly.",
          ]}
        />

        <Section
          title="Cookies & tracking"
          items={[
            "We use a minimal session cookie to keep you logged in. Nothing else.",
            "We do not use third-party tracking pixels, ad scripts, or fingerprinting libraries.",
            "Analytics we run are self-hosted and aggregate-only — no individual user tracking.",
          ]}
        />

        <Section
          title="Contact"
          items={[
            "Questions about your data? Reach us at nazamshiraz4@gmail.com — we respond within 48 hours.",
            "You can request a full export or deletion of your data at any time.",
          ]}
        />

      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mt-16 mb-8" />
      <p className="text-xs opacity-30 text-center max-w-md leading-relaxed">
        This policy is written in plain language on purpose. If something is unclear, just ask.
        We'd rather you understand it than scroll past it.
      </p>

    </div>
  )
}
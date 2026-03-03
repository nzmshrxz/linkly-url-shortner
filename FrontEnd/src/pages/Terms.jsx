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

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16">

      {/* Header */}
      <div className="w-full max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-widest opacity-40 mb-3">Linkly · Legal</p>
        <h1 className="font-bold text-4xl sm:text-5xl leading-tight mb-4">Terms of Use</h1>
        <p className="text-sm leading-relaxed opacity-60 max-w-lg">
          Linkly was built by one person with a lot of late nights and genuine care.
          These terms exist to protect that work and keep this tool useful for everyone.
        </p>
        <p className="text-xs opacity-30 mt-4">Last updated · March 2026</p>
      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mb-16" />

      {/* Story section */}
      <div className="w-full max-w-2xl mb-12">
        <h2 className="font-semibold text-base uppercase tracking-widest mb-3 opacity-50">The person behind this</h2>
        <p className="text-sm leading-relaxed opacity-70 mb-3">
          Hi — I'm <span className="font-semibold opacity-100">Nazam Shiraz</span>, a full stack developer who built Linkly from scratch.
          This started as a project to sharpen my skills across the full stack — backend routing, database design,
          auth, and a frontend that doesn't look like it was made in 2012.
        </p>
        <p className="text-sm leading-relaxed opacity-70">
          What began as a learning exercise turned into something I'm genuinely proud of.
          Every redirect, every click stat, every UI detail was thought through and built by hand.
          If you're using this, thank you — it means more than you'd think.
        </p>
      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mb-12" />

      <div className="w-full max-w-2xl flex flex-col gap-12">

        <Section
          title="What Linkly is"
          items={[
            "Linkly is a URL shortener — paste a long link, get a short one. Simple as that.",
            "It's a solo-built, indie product. Not backed by a corporation, not loaded with venture capital.",
            "The goal is to be fast, clean, and private. No bloat, no nonsense.",
          ]}
        />

        <Section
          title="What you agree not to do"
          items={[
            "Do not use Linkly to shorten links that lead to malware, phishing pages, or any harmful content.",
            "Do not use Linkly for spam — mass unsolicited links, bot traffic, or automated abuse.",
            "Do not attempt to reverse-engineer, scrape, or overload the service with artificial requests.",
            "Do not use shortened links to deceive or mislead people about where they're being sent.",
            "Do not use Linkly for anything illegal under applicable law. This is non-negotiable.",
          ]}
        />

        <Section
          title="Fair use"
          items={[
            "This is a free tool built and maintained by one developer. Please don't abuse it.",
            "Links that violate these terms may be deactivated without notice.",
            "Accounts found misusing the service will be suspended permanently.",
            "If you're building something on top of Linkly, reach out first — I'm open to it.",
          ]}
        />

        <Section
          title="Limitations"
          items={[
            "Linkly is provided as-is. Uptime is not guaranteed, though I try my best.",
            "I'm not liable for how third parties use links created on this platform.",
            "Features may change, be added, or be removed as the product evolves.",
          ]}
        />

      </div>

      <div className="w-full max-w-2xl border-t opacity-10 mt-16 mb-8" />
      <p className="text-xs opacity-30 text-center max-w-md leading-relaxed">
        Built with care by Nazam Shiraz. If something here doesn't sit right with you, just reach out. 
        This is a human project — it deserves a human conversation.
        nazamshiraz4@gmail.com
      </p>

    </div>
  )
}
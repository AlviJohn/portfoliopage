import { useEffect, useState } from 'react'
import EmbeddingField from './EmbeddingField.jsx'
import AskPanel from './AskPanel.jsx'
import { profile, stats, work, experience, skills, education, certifications, awards } from './data.js'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || null)

  const isDark = theme !== 'light'

  function toggle() {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
    setTheme(next)
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        {isDark ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
          </g>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="mark" aria-label="Back to top">
          <span className="mark__a">a</span>
          <span className="mark__dot" />
        </a>
        <nav className="nav__links" aria-label="Sections">
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#toolkit">Toolkit</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

function SectionHead({ index, title, kicker }) {
  return (
    <div className="section-head reveal">
      <span className="section-head__index">layer_{index}</span>
      <h2 className="section-head__title">{title}</h2>
      {kicker && <p className="section-head__kicker">{kicker}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <EmbeddingField />
      <div className="wrap hero__inner">
        <p className="hero__eyebrow">
          <span className="pulse" aria-hidden="true" />
          {profile.role} · {profile.company}
        </p>
        <h1 className="hero__name">
          Alvi <em>Skariah</em> John
        </h1>
        <AskPanel answer={profile.headline} />
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__cta">
          <a className="btn btn--solid" href="#work">
            See selected work
            <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
        </div>
        <ul className="hero__titles" aria-label="Roles">
          {profile.titles.map((t) => (
            <li key={t}>{t}</li>
          ))}
          <li className="hero__loc">{profile.location}</li>
        </ul>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats" aria-label="Impact at a glance">
      <div className="wrap stats__grid">
        {stats.map((s, i) => (
          <div className="stat reveal" style={{ '--d': `${i * 70}ms` }} key={s.label}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead
          index="02"
          title="Selected work"
          kicker="Products and models that moved a number — from GenAI platforms to integer programs."
        />
        <div className="work-grid">
          {work.map((w, i) => (
            <article
              className={`card reveal ${i < 2 ? 'card--feature' : ''}`}
              style={{ '--d': `${(i % 2) * 80}ms` }}
              key={w.title}
              onPointerMove={spotlight}
            >
              <div className="card__top">
                <span className="chip">{w.tag}</span>
                <span className="card__org">{w.org}</span>
              </div>
              <div className="card__metric">
                <span className="card__metric-value">{w.metric}</span>
                <span className="card__metric-label">{w.metricLabel}</span>
              </div>
              <h3 className="card__title">{w.title}</h3>
              <p className="card__summary">{w.summary}</p>
              <ul className="card__stack">
                {w.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead
          index="01"
          title="Experience"
          kicker="Decision scientist, consultant, product builder, practice head — in that order."
        />
        <ol className="timeline">
          {experience.map((job) => (
            <li className="job reveal" key={job.company}>
              <div className="job__period">{job.period}</div>
              <div className="job__body">
                <h3 className="job__company">
                  {job.company}
                  <span className="job__place">{job.place}</span>
                </h3>
                <div className="job__roles">
                  {job.roles.map((r) => (
                    <p className="job__role" key={r.title}>
                      <span>{r.title}</span>
                      <span className="job__dates">{r.dates}</span>
                    </p>
                  ))}
                </div>
                <ul className="job__points">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Toolkit() {
  return (
    <section className="section" id="toolkit">
      <div className="wrap">
        <SectionHead index="03" title="Toolkit" kicker="What I reach for, grouped by the problem it solves." />
        <div className="skills">
          {skills.map((s, i) => (
            <div className="skill reveal" style={{ '--d': `${i * 60}ms` }} key={s.group}>
              <h3 className="skill__group">{s.group}</h3>
              <ul className="skill__items">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="creds">
          <div className="creds__col reveal">
            <h3 className="creds__title">Education</h3>
            <ul className="edu">
              {education.map((e) => (
                <li key={e.school}>
                  <div className="edu__row">
                    <span className="edu__school">{e.school}</span>
                    {e.year && <span className="edu__year">{e.year}</span>}
                  </div>
                  <p className="edu__detail">{e.detail}</p>
                  {e.note && <p className="edu__note">{e.note}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div className="creds__col reveal" style={{ '--d': '80ms' }}>
            <h3 className="creds__title">Certifications</h3>
            <ul className="plain">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <h3 className="creds__title creds__title--spaced">Recognition</h3>
            <ul className="plain">
              {awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <p className="contact__eyebrow reveal">layer_04 · output</p>
        <h2 className="contact__title reveal">
          Have a hard problem <em>worth modelling?</em>
        </h2>
        <p className="contact__text reveal">
          I’m always glad to talk GenAI strategy, applied ML, analytics leadership — or to compare notes on what actually ships.
        </p>
        <div className="contact__actions reveal">
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button className="btn btn--ghost btn--small" onClick={copy}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
        <ul className="contact__links reveal">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <footer className="wrap footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Bengaluru · Built with React</span>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#experience">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Work />
        <Toolkit />
        <Contact />
      </main>
    </>
  )
}

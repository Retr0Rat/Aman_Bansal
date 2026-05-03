const EDUCATION = [
  {
    title: 'AI Graduate Certificate (Co-op)',
    place: 'Durham College · Sep 2025 – Apr 2026',
    desc: 'Machine learning, neural networks, and AI systems with hands-on co-op experience.'
  },
  {
    title: 'Cybersecurity Post-Graduate Certificate',
    place: 'Durham College · Sep 2024 – Apr 2025',
    desc: 'Penetration testing, network defense, SIEM and vulnerability assessment.'
  }
]

const EXPERIENCE = [
  {
    title: 'Campus Tour Guide & Marketing Assistant',
    place: 'Durham College · May 2025 – May 2026',
    desc: 'Representing the college at recruitment events, guiding prospective students and building professional networks in tech and education.'
  },
  {
    title: 'Website Manager',
    badge: 'Full Time',
    place: 'Apex Supplements, IND · Dec 2022 – May 2023',
    desc: 'Managed and maintained the company website, overseeing content updates, performance optimization and e-commerce operations.'
  },
  {
    title: 'Full Stack Developer',
    badge: 'Part Time',
    place: 'Mon Amour, IND · Jun 2021 – Nov 2021',
    desc: 'Built and maintained full stack web features, collaborating with design and product teams to deliver client-facing solutions.'
  }
]

const STATS = [
  { value: '2',  label: 'Diploma Certs' },
  { value: '3',  label: 'Certifications' },
  { value: '10+', label: 'Projects' },
]

function TimelineItem({ item, isLast }) {
  return (
    <div className="flex gap-4 pb-6" style={{ paddingBottom: isLast ? 0 : '24px' }}>
      {/* dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
          style={{ background: '#a855f7', boxShadow: '0 0 10px rgba(168,85,247,0.6)' }}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{ background: 'linear-gradient(180deg, rgba(168,85,247,0.5), transparent)' }}
          />
        )}
      </div>

      {/* content */}
      <div style={{ paddingBottom: isLast ? 0 : '4px' }}>
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h4>
          {item.badge && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7' }}
            >
              {item.badge}
            </span>
          )}
        </div>
        <div className="text-[11px] font-semibold mt-0.5 mb-1.5" style={{ color: 'var(--accent)' }}>
          {item.place}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

export default function About({ theme }) {
  const isDark = theme === 'dark'

  return (
    <div className="about-scroll-wrapper flex items-start md:items-center justify-center h-full md:h-screen overflow-y-auto md:overflow-hidden px-4 sm:px-6 md:px-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-14 max-w-5xl w-full min-w-0 items-start pt-6 md:pt-0 pb-8 md:pb-0">

        {/* ── LEFT ── */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
            About Me
          </p>
          <h1
            className="about-title font-black leading-none mb-5"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.2rem,3.5vw,3.2rem)' }}
          >
            Who I Am
          </h1>
          <style>{`
            .about-title {
              background: linear-gradient(135deg,#0a0a0a 0%,#a855f7 100%);
              -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
            }
            [data-theme="dark"] .about-title {
              background: linear-gradient(135deg,#fff 0%,#a855f7 100%);
              -webkit-background-clip:text; background-clip:text;
            }

            @media (max-width: 767px) {
              /* PROBLEM 1 — bottom breathing room so last item isn't flush */
              .about-scroll-wrapper {
                padding-bottom: 48px;
              }

              /* PROBLEM 2 — visual separator between bio and timeline */
              .about-scroll-panel {
                border-top: 1px solid rgba(168,85,247,0.15);
                padding-top: 24px;
                margin-top: 8px;
              }

              /* PROBLEM 3 — top padding so "ABOUT ME" eyebrow isn't clipped */
              .about-scroll-wrapper {
                padding-top: 20px;
              }
            }
          `}</style>

          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
            I'm a graduate student at Durham College pursuing an AI certificate with co-op option.
            My academic journey combines expertise in artificial intelligence and cybersecurity —
            two fields I'm deeply passionate about.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            This unique blend allows me to build machine learning systems with security best practices
            at their core. Currently seeking co-op opportunities in AI/ML and cybersecurity across Ontario's tech sector.
          </p>

          {/* stats row */}
          <div className="flex gap-4 mb-6">
            {STATS.map(s => (
              <div
                key={s.label}
                className="flex-1 rounded-xl p-4 text-center"
                style={{
                  background: 'rgba(168,85,247,0.05)',
                  border: '1px solid rgba(168,85,247,0.12)'
                }}
              >
                <div
                  className="font-black mb-1"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.6rem', color: 'var(--accent)' }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* location */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(168,85,247,0.06)',
              border: '1px solid rgba(168,85,247,0.15)',
              color: 'var(--text-secondary)'
            }}
          >
            <svg width="13" height="13" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Oshawa, Ontario, Canada &nbsp;·&nbsp; Open to remote & hybrid
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="hidden md:block self-stretch w-px flex-shrink-0"
          style={{ background: 'rgba(168,85,247,0.15)', minHeight: '360px' }}
        />

        {/* ── RIGHT: timeline ── */}
        <div className="about-scroll-panel flex-1 min-w-0 overflow-visible md:overflow-y-auto md:max-h-[calc(100vh-80px)]" onWheel={e => e.stopPropagation()}>

          {/* Education */}
          <div className="mb-6">
            <div
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 pb-2"
              style={{ color: 'var(--accent)', borderBottom: '1px solid rgba(168,85,247,0.12)' }}
            >
              Education
            </div>
            {EDUCATION.map((item, i) => (
              <TimelineItem key={i} item={item} isLast={i === EDUCATION.length - 1} />
            ))}
          </div>

          {/* Experience */}
          <div>
            <div
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 pb-2"
              style={{ color: 'var(--accent)', borderBottom: '1px solid rgba(168,85,247,0.12)' }}
            >
              Experience
            </div>
            {EXPERIENCE.map((item, i) => (
              <TimelineItem key={i} item={item} isLast={i === EXPERIENCE.length - 1} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

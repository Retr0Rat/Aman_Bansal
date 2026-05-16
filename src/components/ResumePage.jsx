import { useRef } from 'react'
import CylinderText from './CylinderText'

const SUMMARY = 'Technology professional with dual post-graduate specializations in Artificial Intelligence and Cybersecurity, built on a foundation of 4+ years in full-stack and application development. Experienced in building production-ready ML systems, REST APIs, CI/CD pipelines, and cloud-deployed applications. Eligible to work in Canada.'

const EXPERIENCE = [
  {
    role: 'Work Study Student',
    company: 'Durham College · Oshawa, ON',
    period: 'May 2025 – May 2026',
    points: [
      'Track and report on social media analytics, enrollment campaign performance, and digital engagement trends to support data-driven marketing decisions.',
      'Lead campus tours for prospective students and families while participating in recruitment events and community outreach activities.',
      'Leveraged data insights and AI-assisted tools to support marketing content strategy, contributing to enrollment campaign materials and digital outreach initiatives.',
    ],
  },
  {
    role: 'Website Manager',
    company: 'Apex Supplements · Noida, IND',
    period: 'Dec 2022 – May 2023',
    points: [
      'Managed end-to-end website operations and technical enhancements, partnering with cross-functional teams to analyze user behavior and drive data-informed improvements to e-commerce platform.',
      'Engineered custom WordPress solutions and integrated marketing assets, creating scalable responsive designs that aligned with brand standards and optimized conversion rates.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Mon Amour · New Delhi, IND',
    period: 'Jun 2021 – Dec 2021',
    points: [
      'Developed end-to-end web applications with React front-end and MongoDB backend, architecting RESTful APIs and database schemas to support dynamic, data-driven user experiences.',
      'Collaborated with cross-functional product teams to deliver scalable full-stack solutions from concept to deployment, optimizing component-based architectures and database query performance.',
    ],
  },
]

const EDUCATION = [
  {
    degree: 'Post Grad Cert — Artificial Intelligence Analysis, Design & Implementation',
    school: 'Durham College',
    period: '2026',
    note: '',
  },
  {
    degree: 'Post Grad Cert — Cybersecurity',
    school: 'Durham College',
    period: '2025',
    note: '',
  },
  {
    degree: "Bachelor's Degree — Computer Applications",
    school: 'GL Bajaj Institute of Management & Technology',
    period: '2023',
    note: '',
  },
]

const SKILLS = {
  'Programming':       ['Python', 'JavaScript', 'NodeJS', 'C/C++', 'Bash', 'PowerShell', 'SQL'],
  'Web Development':   ['React.js', 'Node/Express.js', 'FastAPI', 'REST APIs', 'MongoDB', 'HTML5', 'CSS3', 'Bootstrap'],
  'AI / ML':           ['Prompt Engineering', 'RAG Pipeline', 'XGBoost', 'scikit-learn', 'TensorFlow', 'DistilBERT', 'Transformers', 'NLP', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SMOTE', 'Anomaly Detection', 'Hypothesis Testing', 'Linear Regression', 'Statistical Analysis', 'Tableau'],
  'Security Tools':    ['Nessus', 'OpenVAS', 'Metasploit', 'Burp Suite', 'SQLMap', 'Nmap', 'Wireshark', 'Snort (IDS/IPS)', 'Splunk (SIEM)', 'pfSense', 'Kali Linux', 'Ubuntu', 'Windows Server'],
  'Security Concepts': ['Vulnerability Assessment', 'Threat Detection', 'Network Traffic Analysis', 'OWASP Top 10', 'Authentication/Access Control', 'Encryption/PKI', 'Risk Assessment', 'Incident Response', 'Malware Analysis'],
  'DevOps / Cloud':    ['Git', 'GitHub', 'Docker', 'CI/CD (GitHub Actions)', 'GCP', 'AWS (EC2, S3, VPC)', 'Vercel', 'VirtualBox/VMware', 'Virtual Lab Environments'],
}

const PROJECTS = [
  {
    name: 'Social Media Bot & Fake News Detection — Capstone',
    stack: 'TF-IDF · Logistic Regression · DistilBERT · FastAPI',
    points: ['AI/ML Specialist in team developing misinformation detection platform with dual-approach fake news detection using TF-IDF, Logistic Regression, and DistilBERT transformer models, along with Random Forest bot detector, deployed via FastAPI.'],
  },
  {
    name: 'Prompt Injection & LLM Security Scanner',
    stack: 'DistilBERT · FastAPI · Python · Docker',
    points: ['Fine-tuned DistilBERT to detect prompt injection attacks in LLM applications, achieving 95% accuracy and F1-score of 0.95, deployed via FastAPI and Docker with 10/10 pytest coverage.'],
  },
  {
    name: 'SIEM Network Anomaly Detector',
    stack: 'Isolation Forest · FastAPI · Python · Docker',
    points: ['Built unsupervised anomaly detection system using Isolation Forest on CICIDS 2017 dataset, detecting DDoS attacks without labelled attack data, achieving Macro F1 of 0.71, deployed via FastAPI and Docker.'],
  },
  {
    name: 'Canadian Immigration Data Visualization & Analysis',
    stack: 'Tableau · Python',
    points: ['Analyzed multi-year Canadian immigration dataset, created interactive Tableau dashboard with various visualizations, and developed presentation demonstrating data storytelling with data cleaning and feature engineering.'],
  },
  {
    name: 'Website Security Using Nessus & Snort — Capstone',
    stack: 'Nessus · Snort · Splunk',
    points: ['Designed secure virtual network environment, conducted vulnerability scans with Nessus to identify critical CVEs, implemented Snort IDS/IPS rules, simulated real-world attacks, and captured security events using Splunk SIEM with documented remediation steps.'],
  },
  {
    name: 'Penetration Testing Labs',
    stack: 'Metasploit · Burp Suite · Nmap',
    points: ['Performed reconnaissance and network scanning, exploited vulnerable services with Metasploit Framework, tested web applications for SQL injection, XSS, and authentication flaws using Burp Suite, and produced professional penetration testing reports.'],
  },
]

const CERTS = [
  {
    name: 'Foundation of Cybersecurity',
    issuer: 'Coursera',
    period: '2023',
    skills: 'Network defense, intrusion tactics, system hardening, packet analysis',
  },
]

const ACCOMPLISHMENTS = [
  'Increased website traffic by over 30% as website manager for a startup through SEO optimization and enhanced site functionality, driving measurable growth in online visibility and user engagement.',
  'Managed prospective student engagement and campus operations as campus tour guide and marketing ambassador, coordinating tours and marketing initiatives to support college enrollment and student recruitment efforts.',
]

export default function ResumePage({ theme, onClose }) {
  const isDark = theme === 'dark'
  const cardRef = useRef(null)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 200,
        background: isDark ? '#07070f' : '#f8f6ff',
        overflowY: 'auto',
        animation: 'resumeSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        background: isDark ? 'rgba(7,7,15,0.85)' : 'rgba(248,246,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(168,85,247,0.12)',
      }}>
        {/* Back button — no outline, cylinder hover */}
        <CylinderText
          as="button"
          onClick={onClose}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px',
            letterSpacing: '0.05em', color: 'var(--text-secondary)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '8px 0',
          }}
        >
          ← Back
        </CylinderText>

        {/* Title */}
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '15px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>
          Résumé
        </div>

        {/* Spacer to balance layout */}
        <div style={{ width: '70px' }} />
      </div>

      {/* ── Resume card ── */}
      <div style={{
        maxWidth: '860px',
        margin: '40px auto 80px',
        padding: '0 24px',
      }}>
        <div ref={cardRef} style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(168,85,247,0.12)',
          borderRadius: '24px',
          padding: '52px 56px',
          boxShadow: isDark
            ? '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.08)'
            : '0 24px 80px rgba(168,85,247,0.08)',
        }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid rgba(168,85,247,0.12)' }}>
            <h1 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 900,
              fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 1,
              marginBottom: '10px',
              background: isDark
                ? 'linear-gradient(135deg,#fff 0%,#a855f7 60%,#7c3aed 100%)'
                : 'linear-gradient(135deg,#1a0a2e 0%,#a855f7 60%,#7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Aman Bansal
            </h1>
            <p style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '15px',
              color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '16px',
            }}>
              AI Engineer · Cybersecurity Specialist · Full Stack Developer
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {[
                { icon: '📧', text: 'mail', href: 'mailto:aman.bansal1@dcmail.ca' },
                { icon: '🔗', text: 'linkedin', href: 'https://www.linkedin.com/in/aman-bansal-15b986204/' },
                { icon: '⌨', text: 'github', href: 'https://github.com/Retr0Rat' },
                { icon: '📍', text: 'Oshawa, Ontario · Eligible to work in Canada', href: null },
              ].map(item => (
                item.href
                  ? <a key={item.text} href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >{item.icon} {item.text}</a>
                  : <span key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>{item.icon} {item.text}</span>
              ))}
            </div>
          </div>

          {/* ── Professional Summary ── */}
          <Section title="Professional Summary">
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{SUMMARY}</p>
          </Section>

          {/* ── Skills ── */}
          <Section title="Skills">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', minWidth: '140px', paddingTop: '3px', flexShrink: 0 }}>
                    {category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {skills.map(s => (
                      <span key={s} style={{
                        padding: '3px 11px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                        background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.18)', color: 'var(--text-secondary)',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Experience ── */}
          <Section title="Experience">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} style={{ marginBottom: i < EXPERIENCE.length - 1 ? '24px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{exp.role}</div>
                    <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{exp.period}</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: '#a855f7', marginTop: '2px', flexShrink: 0 }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {/* ── Projects ── */}
          <Section title="Related Projects">
            {PROJECTS.map((proj, i) => (
              <div key={i} style={{ marginBottom: i < PROJECTS.length - 1 ? '20px' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{proj.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em' }}>{proj.stack}</div>
                </div>
                {proj.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: '#a855f7', marginTop: '2px', flexShrink: 0 }}>▸</span>{pt}
                  </div>
                ))}
              </div>
            ))}
          </Section>

          {/* ── Education ── */}
          <Section title="Education">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {EDUCATION.map((ed, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{ed.degree}</div>
                    <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{ed.school}</div>
                    {ed.note && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{ed.note}</div>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{ed.period}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Certifications ── */}
          <Section title="Certifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CERTS.map(c => (
                <div key={c.name} style={{
                  padding: '14px 18px', borderRadius: '14px',
                  border: '1px solid rgba(168,85,247,0.2)',
                  background: 'rgba(168,85,247,0.05)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#a855f7', fontSize: '12px' }}>✦</span>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{c.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{c.issuer}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{c.period}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', paddingLeft: '20px' }}>{c.skills}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Career Accomplishments ── */}
          <Section title="Career Accomplishments" last>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ACCOMPLISHMENTS.map((a, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  <span style={{ color: '#a855f7', marginTop: '3px', flexShrink: 0 }}>▸</span>{a}
                </li>
              ))}
            </ul>
          </Section>

          {/* ── Download button at the end ── */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid rgba(168,85,247,0.12)' }}>
            <CylinderText
              href="/Resume.pdf"
              download="Aman_Bansal_Resume.pdf"
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px',
                color: '#a855f7', letterSpacing: '0.04em',
              }}
            >
              ↓ Download PDF
            </CylinderText>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes resumeSlideIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          .resume-card-inner { padding: 28px 20px !important; }
        }
      `}</style>
    </div>
  )
}

function Section({ title, children, last = false }) {
  return (
    <div style={{ marginBottom: last ? 0 : '36px', paddingBottom: last ? 0 : '32px', borderBottom: last ? 'none' : '1px solid rgba(168,85,247,0.08)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a855f7' }}>
          {title}
        </div>
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,85,247,0.15)' }} />
      </div>
      {children}
    </div>
  )
}

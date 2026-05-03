import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import CylinderText from './CylinderText'

/* ─────────────────────────────────────────────
   EmailJS credentials — fill these in:
   1. Go to https://www.emailjs.com and sign up (free)
   2. Dashboard → Email Services → Add New Service → connect your Gmail
      Copy the  Service ID  →  paste below as EMAILJS_SERVICE_ID
   3. Dashboard → Email Templates → Create New Template
      Use these variables in your template:
        {{from_name}}  {{from_email}}  {{organisation}}
        {{role}}  {{subject}}  {{message}}
      Copy the  Template ID  →  paste below as EMAILJS_TEMPLATE_ID
   4. Dashboard → Account → Public Key
      Copy it  →  paste below as EMAILJS_PUBLIC_KEY
───────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // ← paste here
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // ← paste here
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // ← paste here

/* Send button states */
const STATE = { IDLE: 'idle', SENDING: 'sending', SENT: 'sent', ERROR: 'error' }

export default function Contact({ theme }) {
  const isDark = theme === 'dark'
  const [sendState, setSendState] = useState(STATE.IDLE)
  const [agreed, setAgreed]       = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const [name,    setName]    = useState('')
  const [org,     setOrg]     = useState('')
  const [email,   setEmail]   = useState('')
  const [role,    setRole]    = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!agreed || sendState !== STATE.IDLE) return

    setSendState(STATE.SENDING)

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { from_name: name, from_email: email, organisation: org, role, subject, message },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setSendState(STATE.SENT)
      setName(''); setOrg(''); setEmail(''); setRole(''); setSubject(''); setMessage('')
      setAgreed(false)
      setTimeout(() => setSendState(STATE.IDLE), 2800)
    })
    .catch(() => {
      setSendState(STATE.ERROR)
      setTimeout(() => setSendState(STATE.IDLE), 3000)
    })
  }

  return (
    <div className="contact-outer">
      <div className="contact-inner">

        {/* ── LEFT ── */}
        <div className="contact-col-left">
          <div style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#a855f7', marginBottom: '10px',
          }}>Contact</div>

          <div className="contact-title">
            Let's Work<br />Together
          </div>

          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
            Whether it's a co-op opportunity, a project, or just to say hello — drop me a line and I'll get back to you.
          </div>

          <a href="mailto:aman.bansal1@dcmail.ca" className="email-pill">
            <div className="email-dot" />
            aman.bansal12dcmail.ca
          </a>

          {/* Map */}
          <div style={{
            marginTop: '20px', borderRadius: '16px',
            border: '1px solid rgba(168,85,247,0.12)',
            background: 'rgba(168,85,247,0.03)',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: '10px', left: '12px',
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '8px',
              background: isDark ? 'rgba(7,7,15,0.88)' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(168,85,247,0.2)',
              fontSize: '11px', fontWeight: 700, color: '#a855f7',
              zIndex: 1,
            }}>
              📍 Oshawa, Ontario
            </div>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-78.9658%2C43.8571%2C-78.7658%2C43.9371&layer=mapnik&marker=43.8971%2C-78.8658"
              scrolling="no"
              loading="lazy"
              title="Location map"
              style={{
                width: '100%', height: '150px', display: 'block', border: 'none',
                filter: 'invert(0.88) hue-rotate(180deg) saturate(0.35) brightness(0.65)',
              }}
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="contact-divider" />

        {/* ── RIGHT — form ── */}
        <div className="contact-col-right">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Name + Organisation */}
            <div className="cf-row">
              <Field label="Name *" className="cf-col-left">
                <input type="text" placeholder="Your Name" className="cf-input" required value={name} onChange={e => setName(e.target.value)} />
              </Field>
              <Field label="Organisation" className="cf-col-right">
                <input type="text" placeholder="Company / University" className="cf-input" value={org} onChange={e => setOrg(e.target.value)} />
              </Field>
            </div>

            {/* Email + Role */}
            <div className="cf-row">
              <Field label="Email *" className="cf-col-left">
                <input type="email" placeholder="john@email.com" className="cf-input" required value={email} onChange={e => setEmail(e.target.value)} />
              </Field>
              <Field label="Role" className="cf-col-right">
                <select className="cf-input cf-select" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="" disabled>Select...</option>
                  <option>Recruiter / HR</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Founder / CEO</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>

            {/* Subject */}
            <Field label="Subject">
              <input type="text" placeholder="Co-op opportunity / Freelance / Collab" className="cf-input" value={subject} onChange={e => setSubject(e.target.value)} />
            </Field>

            {/* Message */}
            <Field label="Message *">
              <textarea
                placeholder="Tell me about your project or opportunity..."
                className="cf-input"
                style={{ minHeight: '70px', resize: 'none' }}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </Field>

            {/* Policy + Send row */}
            <div className="cf-policy-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '22px', gap: '16px', flexWrap: 'wrap' }}>

              {/* Policy checkbox */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, cursor: 'pointer',
              }}>
                <span
                  onClick={() => setAgreed(a => !a)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    border: agreed ? 'none' : '1.5px solid rgba(168,85,247,0.35)',
                    background: agreed ? 'linear-gradient(135deg,#a855f7,#7c3aed)' : 'transparent',
                    boxShadow: agreed ? '0 0 8px rgba(168,85,247,0.4)' : 'none',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}
                >
                  {agreed && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                I agree to the{' '}
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); setShowPrivacy(true) }}
                  style={{ color: '#a855f7', textDecoration: 'underline' }}
                >privacy policy</a>
              </label>

              {/* Send button — pill style, no circle */}
              <button
                type="submit"
                disabled={!agreed || sendState !== STATE.IDLE}
                className={`cf-send-btn cf-send-${sendState}`}
              >
                {sendState === STATE.IDLE && (
                  <CylinderText
                    style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '15px', letterSpacing: '0.06em' }}
                  >
                    Send →
                  </CylinderText>
                )}
                {sendState === STATE.SENDING && (
                  <span className="cf-sending-text">Sending...</span>
                )}
                {sendState === STATE.SENT && (
                  <span className="cf-sent-text">Sent ✓</span>
                )}
                {sendState === STATE.ERROR && (
                  <span className="cf-error-text">Failed — try again</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* ── Privacy Policy Modal ── */}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} isDark={isDark} />}

      <style>{`
        /* layout */
        .contact-outer {
          width: 100%; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 64px 64px;
          overflow: hidden;
        }
        .contact-inner {
          display: flex; flex-direction: row; gap: 56px;
          max-width: 1000px; width: 100%; align-items: center;
        }
        .contact-col-left  { flex: 1; min-width: 0; }
        .contact-col-right { flex: 1; min-width: 0; }
        .contact-divider {
          width: 1px; align-self: stretch; flex-shrink: 0;
          background: rgba(168,85,247,0.15); min-height: 360px;
        }

        /* two-column form rows */
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .cf-col-left  { padding-right: 28px; border-right: 1px solid rgba(168,85,247,0.1); }
        .cf-col-right { padding-left: 28px; }

        @media (max-width: 1023px) {
          .contact-outer {
            padding: 16px;
            align-items: flex-start;
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;                      /* constrain so overflow-y-auto scrolls */
            -webkit-overflow-scrolling: touch;
          }
          .contact-inner  {
            flex-direction: column;
            gap: 28px;
            width: 100%;
            padding-bottom: 32px;
          }
          .contact-col-left  { width: 100%; }
          .contact-col-right { width: 100%; }
          .contact-divider { display: none; }
          .cf-row { grid-template-columns: 1fr; }
          .cf-col-left  { padding-right: 0; border-right: none; }
          .cf-col-right { padding-left: 0; }
          .cf-policy-row { flex-direction: column; align-items: stretch; }
          .cf-send-btn { width: 100%; justify-content: center; }
        }

        /* gradient title */
        .contact-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
          line-height: 1.15;
          padding-bottom: 4px;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #0a0a0a 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        [data-theme="dark"] .contact-title {
          background: linear-gradient(135deg, #ffffff 0%, #a855f7 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* email pill */
        .email-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px; border-radius: 30px;
          border: 1px solid rgba(168,85,247,0.22);
          background: rgba(168,85,247,0.05);
          font-size: 13px; font-weight: 600; color: var(--text-secondary);
          text-decoration: none; transition: all 0.25s;
        }
        .email-pill:hover { border-color: #a855f7; color: var(--text-primary); background: rgba(168,85,247,0.1); }
        .email-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.8);
          animation: cfBlink 2s infinite; flex-shrink: 0;
        }
        @keyframes cfBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* form fields */
        .cf-field {
          padding: 16px 0;
          border-bottom: 1px solid rgba(168,85,247,0.1);
          display: flex; flex-direction: column; gap: 5px;
          transition: border-color 0.2s;
        }
        .cf-field:focus-within { border-bottom-color: rgba(168,85,247,0.4); }
        .cf-field label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--text-muted); transition: color 0.2s;
        }
        .cf-field:focus-within label { color: #a855f7; }

        .cf-input {
          background: transparent; border: none; outline: none;
          color: var(--text-primary); font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 500; padding: 0; width: 100%;
        }
        .cf-input::placeholder { color: var(--text-muted); opacity: 0.4; }
        .cf-select { appearance: none; -webkit-appearance: none; cursor: pointer; }
        .cf-select option { background: var(--bg-secondary); color: var(--text-primary); }

        /* ── Send button ── pill style, no circle ── */
        .cf-send-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          padding: 11px 28px;
          border-radius: 14px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: var(--text-primary);
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        /* glow fill on hover when idle */
        .cf-send-btn.cf-send-idle:not(:disabled):hover {
          background: linear-gradient(135deg, rgba(168,85,247,0.12), rgba(124,58,237,0.12));
          box-shadow: 0 4px 20px rgba(168,85,247,0.25);
          transform: translateY(-1px);
        }
        .cf-send-btn:active { transform: scale(0.96) !important; }

        /* disabled = policy not agreed */
        .cf-send-btn:disabled {
          opacity: 0.38;
          cursor: not-allowed;
        }

        /* sending state — pulse glow */
        .cf-send-btn.cf-send-sending {
          animation: sendPulse 0.9s ease-in-out infinite;
          cursor: default;
        }
        @keyframes sendPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.3); }
          50%      { box-shadow: 0 0 0 6px rgba(168,85,247,0); }
        }

        .cf-sending-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: var(--accent);
          letter-spacing: 0.04em;
          animation: sendingFlicker 0.7s ease-in-out infinite;
        }
        @keyframes sendingFlicker {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.45; }
        }

        /* sent state — green */
        .cf-send-btn.cf-send-sent {
          background: rgba(34,197,94,0.08);
          box-shadow: 0 4px 18px rgba(34,197,94,0.2);
          cursor: default;
          animation: sentPop 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes sentPop {
          from { transform: scale(0.92); }
          to   { transform: scale(1); }
        }
        .cf-sent-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #22c55e;
          letter-spacing: 0.04em;
        }

        /* error state — red */
        .cf-send-btn.cf-send-error {
          background: rgba(239,68,68,0.08);
          box-shadow: 0 4px 18px rgba(239,68,68,0.15);
          cursor: default;
        }
        .cf-error-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #ef4444;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  )
}

function Field({ label, children, className }) {
  return (
    <div className={`cf-field${className ? ' ' + className : ''}`}>
      <label>{label}</label>
      {children}
    </div>
  )
}

const PRIVACY_SECTIONS = [
  { title: '1. Information We Collect',   body: 'When you submit the contact form on this website, we collect the information you provide — including your name, email address, organisation, role, and message. This information is collected solely to respond to your enquiry.' },
  { title: '2. How We Use Your Information', body: 'Your information is used exclusively to respond to your message. We do not use your data for marketing, advertising, or any other commercial purpose without your explicit consent.' },
  { title: '3. Data Sharing',             body: 'We do not sell, trade, or share your personal information with third parties. Your data is transmitted securely via EmailJS (emailjs.com) to deliver your message to the site owner and is not stored on any external server beyond what is required for delivery.' },
  { title: '4. Data Retention',           body: 'Contact form submissions are retained only as long as necessary to respond to your enquiry. You may request deletion of your data at any time by emailing amanbansal.durham@gmail.com.' },
  { title: '5. Cookies & Tracking',       body: 'This website does not use cookies, tracking pixels, or any analytics tools that collect personally identifiable information.' },
  { title: '6. Security',                 body: 'We take reasonable technical measures to protect your information during transmission. However, no method of transmission over the internet is 100% secure.' },
  { title: '7. Your Rights',              body: 'You have the right to access, correct, or request deletion of any personal data you have submitted. To exercise these rights, contact us at amanbansal.durham@gmail.com.' },
  { title: '8. Changes to This Policy',   body: 'This privacy policy may be updated from time to time. Any changes will be reflected on this page. Continued use of the contact form constitutes acceptance of the updated policy.' },
  { title: '9. Contact',                  body: 'For any privacy-related questions, please reach out at amanbansal.durham@gmail.com.' },
]

function PrivacyModal({ onClose, isDark }) {
  // Lock page scroll while modal is open
  React.useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Stop wheel events from bubbling out of the modal
  function handleWheel(e) { e.stopPropagation() }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="privacy-modal-inner"
        style={{
          maxWidth: '900px', width: '100%', maxHeight: '85vh',
          borderRadius: '20px',
          background: isDark ? '#0d0d14' : '#ffffff',
          border: '1px solid rgba(168,85,247,0.2)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          display: 'flex', flexDirection: 'row',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── LEFT panel — sticky title ── */}
        <div className="privacy-modal-left" style={{
          width: '260px', flexShrink: 0,
          padding: '40px 32px',
          borderRight: '1px solid rgba(168,85,247,0.12)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          background: isDark ? 'rgba(168,85,247,0.03)' : 'rgba(168,85,247,0.02)',
        }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a855f7', marginBottom: '10px' }}>
              Legal
            </p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem,2.5vw,2rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
              Privacy<br />Policy
            </h2>
            <p style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--text-muted)' }}>
              How we handle your data when you reach out through the contact form.
            </p>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '32px' }}>
            Last updated<br />April 2026
          </p>
        </div>

        {/* ── RIGHT panel — scrollable sections ── */}
        <div className="privacy-modal-right" onWheel={handleWheel} style={{ flex: 1, overflowY: 'auto', padding: '40px 36px 40px 40px' }}>
          {PRIVACY_SECTIONS.map(section => (
            <div key={section.title} style={{ marginBottom: '22px' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '5px' }}>
                {section.title}
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '50%', width: '32px', height: '32px',
            color: '#a855f7', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1, zIndex: 1,
          }}
        >×</button>

        {/* mobile: stack vertically */}
        <style>{`
          @media (max-width: 640px) {
            .privacy-modal-inner { flex-direction: column !important; }
            .privacy-modal-left  { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(168,85,247,0.12); padding: 28px 24px !important; }
            .privacy-modal-right { padding: 28px 24px !important; }
          }

          /* Custom thin purple scrollbar for the policy panel */
          .privacy-modal-right::-webkit-scrollbar       { width: 4px; }
          .privacy-modal-right::-webkit-scrollbar-track { background: transparent; }
          .privacy-modal-right::-webkit-scrollbar-thumb {
            background: rgba(168,85,247,0.35);
            border-radius: 4px;
          }
          .privacy-modal-right::-webkit-scrollbar-thumb:hover {
            background: rgba(168,85,247,0.65);
          }
          .privacy-modal-right { scrollbar-width: thin; scrollbar-color: rgba(168,85,247,0.35) transparent; }
        `}</style>
      </div>
    </div>
  )
}

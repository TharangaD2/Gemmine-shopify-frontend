import React, { useState, useRef, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserSession = {
  type: 'guest' | 'customer';
  name: string;
  email: string;
  phone?: string;
};

type Modal = 'dropdown' | 'login' | 'signup' | 'inquiry' | null;

interface CartAuthFlowProps {
  /** Called when the user has authenticated AND submitted the inquiry form */
  onConfirm: (session: UserSession, inquiry: InquiryData) => void;
  /** Position of the trigger button for the dropdown */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Whether the auth-flow is active */
  isOpen: boolean;
  onClose: () => void;
}

export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gemmine_session';
const USERS_KEY = 'gemmine_users';

export function getStoredSession(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: UserSession) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function getUsers(): Array<{ name: string; email: string; password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Array<{ name: string; email: string; password: string }>) : [];
  } catch {
    return [];
  }
}

function saveUser(name: string, email: string, password: string) {
  const users = getUsers();
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function validateCredentials(email: string, password: string) {
  const users = getUsers();
  return users.find((u) => u.email === email && u.password === password);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Overlay({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(2px)',
      }}
    />
  );
}

function ModalCard({
  children,
  onClose,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <Overlay onClick={onClose} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          background: 'linear-gradient(145deg, #1e2a47, #16213e)',
          borderRadius: '20px',
          padding: '2.5rem',
          width: 'min(480px, 92vw)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,168,154,0.15)',
          fontFamily: 'inherit',
          animation: 'caf-fadein 0.25s ease',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '1.2rem',
            lineHeight: 1,
            padding: '0.25rem',
          }}
        >
          ✕
        </button>

        {/* Gem icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '2rem' }}>💎</span>
        </div>

        <h2
          style={{
            margin: '0 0 0.35rem',
            textAlign: 'center',
            color: '#fff',
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              margin: '0 0 1.5rem',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.875rem',
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
      <style>{`
        @keyframes caf-fadein {
          from { opacity: 0; transform: translate(-50%, -52%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: '1px solid rgba(212,168,154,0.25)',
  background: 'rgba(255,255,255,0.06)',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: '1rem',
  transition: 'border-color 0.2s',
};

const primaryBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(135deg, #d4a89a, #c17f72)',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  letterSpacing: '0.02em',
  transition: 'opacity 0.2s, transform 0.1s',
  marginTop: '0.25rem',
};

const linkBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#d4a89a',
  cursor: 'pointer',
  fontSize: '0.85rem',
  padding: 0,
  textDecoration: 'underline',
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ color: '#ff7875', fontSize: '0.8rem', margin: '-0.75rem 0 0.75rem' }}>{msg}</p>;
}

// ─── Login Modal ──────────────────────────────────────────────────────────────

function LoginModal({
  onSuccess,
  onSignup,
  onClose,
}: {
  onSuccess: (session: UserSession) => void;
  onSignup: () => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('All fields are required.'); return; }
    const user = validateCredentials(email, password);
    if (!user) { setError('Invalid email or password.'); return; }
    const session: UserSession = { type: 'customer', name: user.name, email: user.email };
    saveSession(session);
    onSuccess(session);
  };

  return (
    <ModalCard title="Welcome Back" subtitle="Login to continue your purchase" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <FieldError msg={error} />}
        <button type="submit" style={primaryBtnStyle}>
          Login
        </button>
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>
          Don't have an account?{' '}
          <button type="button" style={linkBtnStyle} onClick={onSignup}>
            Create account
          </button>
        </div>
      </form>
    </ModalCard>
  );
}

// ─── Signup Modal ─────────────────────────────────────────────────────────────

function SignupModal({
  onSuccess,
  onLogin,
  onClose,
}: {
  onSuccess: (session: UserSession) => void;
  onLogin: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirm) newErrors.confirm = 'Passwords do not match.';
    const existing = getUsers().find((u) => u.email === email);
    if (existing) newErrors.email = 'An account with this email already exists.';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    saveUser(name.trim(), email, password);
    const session: UserSession = { type: 'customer', name: name.trim(), email };
    saveSession(session);
    onSuccess(session);
  };

  return (
    <ModalCard title="Create Account" subtitle="Join Gem Mine to continue" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        <FieldError msg={errors.name} />
        <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FieldError msg={errors.email} />
        <input style={inputStyle} type="password" placeholder="Password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FieldError msg={errors.password} />
        <input style={inputStyle} type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <FieldError msg={errors.confirm} />
        <button type="submit" style={primaryBtnStyle}>
          Create Account
        </button>
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>
          Already have an account?{' '}
          <button type="button" style={linkBtnStyle} onClick={onLogin}>
            Login
          </button>
        </div>
      </form>
    </ModalCard>
  );
}

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({
  session,
  onSubmit,
  onClose,
}: {
  session: UserSession;
  onSubmit: (data: InquiryData) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(session.name);
  const [email, setEmail] = useState(session.email);
  const [phone, setPhone] = useState(session.phone || '');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!phone) newErrors.phone = 'Phone is required.';
    if (!message.trim()) newErrors.message = 'Please add a message or note.';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    onSubmit({ name: name.trim(), email, phone, message: message.trim() });
  };

  return (
    <ModalCard title="Inquiry Details" subtitle="Please complete your inquiry before we add the item to your cart" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <FieldError msg={errors.name} />
        <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FieldError msg={errors.email} />
        <input style={inputStyle} type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <FieldError msg={errors.phone} />
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
          placeholder="Message or special notes (optional details about your order)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <FieldError msg={errors.message} />
        <button type="submit" style={primaryBtnStyle}>
          Submit & Add to Cart
        </button>
      </form>
    </ModalCard>
  );
}

// ─── Login Type Dropdown ──────────────────────────────────────────────────────

function LoginDropdown({
  onGuest,
  onCustomer,
  onClose,
}: {
  onGuest: () => void;
  onCustomer: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const itemStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1.25rem',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '0.95rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderRadius: '10px',
    transition: 'background 0.15s',
    textAlign: 'left',
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        zIndex: 9999,
        background: 'linear-gradient(145deg, #1e2a47, #16213e)',
        borderRadius: '14px',
        padding: '0.5rem',
        minWidth: '220px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,154,0.2)',
        animation: 'caf-dropdown 0.18s ease',
      }}
    >
      <button
        style={itemStyle}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,168,154,0.15)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
        onClick={onGuest}
      >
        <span style={{ fontSize: '1.2rem' }}>👤</span>
        <div>
          <div style={{ fontWeight: 600 }}>Login as Guest</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>Quick, no account needed</div>
        </div>
      </button>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0.25rem 0' }} />

      <button
        style={itemStyle}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,168,154,0.15)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
        onClick={onCustomer}
      >
        <span style={{ fontSize: '1.2rem' }}>🔑</span>
        <div>
          <div style={{ fontWeight: 600 }}>Login as Customer</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>Use your Gem Mine account</div>
        </div>
      </button>

      <style>{`
        @keyframes caf-dropdown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CartAuthFlow({ isOpen, onClose, onConfirm, triggerRef: _triggerRef }: CartAuthFlowProps) {
  const [modal, setModal] = useState<Modal>('dropdown');
  const [session, setSession] = useState<UserSession | null>(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) setModal('dropdown');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setModal(null);
    onClose();
  };

  const handleGuestSelect = () => {
    const guestSession: UserSession = { type: 'guest', name: 'Guest', email: '' };
    setSession(guestSession);
    setModal('inquiry');
  };

  const handleCustomerSelect = () => {
    const existing = getStoredSession();
    if (existing && existing.type === 'customer') {
      setSession(existing);
      setModal('inquiry');
    } else {
      setModal('login');
    }
  };

  const handleLoginSuccess = (s: UserSession) => {
    setSession(s);
    setModal('inquiry');
  };

  const handleInquirySubmit = (data: InquiryData) => {
    if (!session) return;
    onConfirm(session, data);
    handleClose();
  };

  return (
    <>
      {modal === 'dropdown' && (
        <>
          <Overlay onClick={handleClose} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
            <LoginDropdown
              onGuest={handleGuestSelect}
              onCustomer={handleCustomerSelect}
              onClose={handleClose}
            />
          </div>
        </>
      )}

      {modal === 'login' && (
        <LoginModal
          onSuccess={handleLoginSuccess}
          onSignup={() => setModal('signup')}
          onClose={handleClose}
        />
      )}

      {modal === 'signup' && (
        <SignupModal
          onSuccess={handleLoginSuccess}
          onLogin={() => setModal('login')}
          onClose={handleClose}
        />
      )}

      {modal === 'inquiry' && session && (
        <InquiryModal
          session={session}
          onSubmit={handleInquirySubmit}
          onClose={handleClose}
        />
      )}
    </>
  );
}

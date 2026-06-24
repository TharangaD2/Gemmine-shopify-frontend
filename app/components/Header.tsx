import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router';
import {
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
} from 'lucide-react';
import type { HeaderQuery } from 'storefrontapi.generated';
import logo from '~/assets/img/logo.png';

const createPageUrl = (path: string) => {
  const handle = path.toLowerCase();
  if (handle === 'collections') return '/collections/all';
  if (handle === 'blog') return '/blogs';
  if (handle === 'wishlist') return '/pages/wishlist';
  if (handle === 'cart') return '/cart';
  return `/pages/${handle}`;
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputSt: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', borderRadius: '10px',
  border: '1px solid rgba(212,168,154,0.25)', background: 'rgba(255,255,255,0.06)',
  color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
  marginBottom: '1rem', transition: 'border-color 0.2s',
};
const primaryBtnSt: React.CSSProperties = {
  width: '100%', padding: '0.85rem', borderRadius: '10px', border: 'none',
  background: 'linear-gradient(135deg, #d4a89a, #c17f72)', color: '#fff',
  fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em',
  transition: 'opacity 0.2s', marginTop: '0.25rem',
};
const linkBtnSt: React.CSSProperties = {
  background: 'transparent', border: 'none', color: '#d4a89a', cursor: 'pointer',
  fontSize: '0.85rem', padding: 0, textDecoration: 'underline',
};

// ─── Local UI helpers ─────────────────────────────────────────────────────────
const Button = ({
  variant = 'ghost', size = 'icon', className = '', children, onClick,
}: {
  variant?: 'ghost' | 'outline'; size?: 'icon' | 'default';
  className?: string; children: React.ReactNode; onClick?: () => void;
}) => {
  const base = 'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const vars = { ghost: 'hover:bg-transparent', outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' };
  const szs = { icon: 'h-10 w-10', default: 'h-10 px-4 py-2' };
  return <button className={`${base} ${vars[variant]} ${szs[size]} ${className}`} onClick={onClick}>{children}</button>;
};

const Badge = ({ className = '', children }: { className?: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</span>
);

function ErrMsg({ msg }: { msg?: string }) {
  return msg ? <p style={{ color: '#ff7875', fontSize: '0.8rem', margin: '-0.75rem 0 0.75rem' }}>{msg}</p> : null;
}

// ─── Session helpers ──────────────────────────────────────────────────────────
const SESSION_STORE = 'gemmine_session';
const USERS_STORE = 'gemmine_users';

type StoredSession = { type: 'guest' | 'customer'; name: string; email: string };

function readSession(): StoredSession | null {
  if (typeof window === 'undefined') return null;
  try { const r = sessionStorage.getItem(SESSION_STORE); return r ? JSON.parse(r) as StoredSession : null; } catch { return null; }
}
function writeSession(s: StoredSession) { sessionStorage.setItem(SESSION_STORE, JSON.stringify(s)); }
function clearSession() { sessionStorage.removeItem(SESSION_STORE); }
function readUsers(): Array<{ name: string; email: string; password: string }> {
  try { const r = localStorage.getItem(USERS_STORE); return r ? JSON.parse(r) as Array<{ name: string; email: string; password: string }> : []; } catch { return []; }
}
function writeUser(name: string, email: string, pw: string) {
  const u = readUsers(); u.push({ name, email, password: pw }); localStorage.setItem(USERS_STORE, JSON.stringify(u));
}
function checkCreds(email: string, pw: string) { return readUsers().find(u => u.email === email && u.password === pw); }

// ─── Cart Dropdown ─────────────────────────────────────────────────────────────
function CartDropdown({ onGuest, onCustomer, onViewCart, isLoggedIn, onLogout, onClose }: {
  onGuest: () => void; onCustomer: () => void; onViewCart: () => void;
  isLoggedIn: boolean; onLogout: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function outside(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); }
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [onClose]);

  const row: React.CSSProperties = {
    width: '100%', padding: '0.7rem 1.1rem', background: 'transparent', border: 'none',
    color: '#fff', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
    gap: '0.65rem', borderRadius: '10px', transition: 'background 0.15s', textAlign: 'left',
  };
  const h = (e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,168,154,0.15)'; };
  const l = (e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; };
  const sep = <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0.25rem 0' }} />;

  return (
    <div ref={ref} style={{
      position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 9999,
      background: 'linear-gradient(145deg, #1e2a47, #16213e)', borderRadius: '16px',
      padding: '0.5rem', minWidth: '230px',
      boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,168,154,0.2)',
      animation: 'hdd 0.2s ease',
    }}>
      <button style={row} onMouseEnter={h} onMouseLeave={l} onClick={onViewCart}>
        <ShoppingBag size={16} style={{ color: '#d4a89a', flexShrink: 0 }} />
        <div><div style={{ fontWeight: 600 }}>View Cart</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Go to your cart</div></div>
      </button>
      {sep}
      {isLoggedIn ? (
        <button style={row} onMouseEnter={h} onMouseLeave={l} onClick={onLogout}>
          <LogOut size={16} style={{ color: '#d4a89a', flexShrink: 0 }} />
          <div><div style={{ fontWeight: 600 }}>Logout</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Sign out of your account</div></div>
        </button>
      ) : (
        <>
          <button style={row} onMouseEnter={h} onMouseLeave={l} onClick={onGuest}>
            <User size={16} style={{ color: '#d4a89a', flexShrink: 0 }} />
            <div><div style={{ fontWeight: 600 }}>Login as Guest</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Quick, no account needed</div></div>
          </button>
          {sep}
          <button style={row} onMouseEnter={h} onMouseLeave={l} onClick={onCustomer}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>🔑</span>
            <div><div style={{ fontWeight: 600 }}>Login as Customer</div><div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Use your Gem Mine account</div></div>
          </button>
        </>
      )}
      <style>{`@keyframes hdd{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Modal shell ──────────────────────────────────────────────────────────────
function ModalCard({ children, title, subtitle, onClose }: {
  children: React.ReactNode; title: string; subtitle?: string; onClose: () => void;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 9999,
        background: 'linear-gradient(145deg,#1e2a47,#16213e)', borderRadius: '20px', padding: '2.5rem',
        width: 'min(460px,92vw)', boxShadow: '0 25px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(212,168,154,0.15)',
        fontFamily: 'inherit', animation: 'mdin 0.25s ease',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>✕</button>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}><span style={{ fontSize: '2rem' }}>💎</span></div>
        <h2 style={{ margin: '0 0 0.3rem', textAlign: 'center', color: '#fff', fontSize: '1.35rem', fontWeight: 700 }}>{title}</h2>
        {subtitle && <p style={{ margin: '0 0 1.4rem', textAlign: 'center', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>{subtitle}</p>}
        {children}
        <style>{`@keyframes mdin{from{opacity:0;transform:translate(-50%,-52%)}to{opacity:1;transform:translate(-50%,-50%)}}`}</style>
      </div>
    </>
  );
}

// ─── Auth modals ──────────────────────────────────────────────────────────────
function LoginModal({ onSuccess, onSignup, onClose }: {
  onSuccess: (s: StoredSession) => void; onSignup: () => void; onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setErr('');
    if (!email || !pw) { setErr('All fields required.'); return; }
    const user = checkCreds(email, pw);
    if (!user) { setErr('Invalid email or password.'); return; }
    const s: StoredSession = { type: 'customer', name: user.name, email: user.email };
    writeSession(s); onSuccess(s);
  };
  return (
    <ModalCard title="Welcome Back" subtitle="Login to continue your purchase" onClose={onClose}>
      <form onSubmit={submit}>
        <input style={inputSt} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
        <input style={inputSt} type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} />
        <ErrMsg msg={err} />
        <button type="submit" style={primaryBtnSt}>Login</button>
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>
          Don't have an account?{' '}<button type="button" style={linkBtnSt} onClick={onSignup}>Create account</button>
        </div>
      </form>
    </ModalCard>
  );
}

function SignupModal({ onSuccess, onLogin, onClose }: {
  onSuccess: (s: StoredSession) => void; onLogin: () => void; onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const [errs, setErrs] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ne: Record<string, string> = {};
    if (!name.trim()) ne.name = 'Name is required.';
    if (!email) ne.email = 'Email is required.';
    if (pw.length < 6) ne.pw = 'Min. 6 characters.';
    if (pw !== cpw) ne.cpw = 'Passwords do not match.';
    if (readUsers().find(u => u.email === email)) ne.email = 'Account already exists.';
    if (Object.keys(ne).length) { setErrs(ne); return; }
    writeUser(name.trim(), email, pw);
    const s: StoredSession = { type: 'customer', name: name.trim(), email };
    writeSession(s); onSuccess(s);
  };
  return (
    <ModalCard title="Create Account" subtitle="Join Gem Mine to continue" onClose={onClose}>
      <form onSubmit={submit}>
        <input style={inputSt} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} autoFocus />
        <ErrMsg msg={errs.name} />
        <input style={inputSt} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <ErrMsg msg={errs.email} />
        <input style={inputSt} type="password" placeholder="Password (min. 6 characters)" value={pw} onChange={e => setPw(e.target.value)} />
        <ErrMsg msg={errs.pw} />
        <input style={inputSt} type="password" placeholder="Confirm password" value={cpw} onChange={e => setCpw(e.target.value)} />
        <ErrMsg msg={errs.cpw} />
        <button type="submit" style={primaryBtnSt}>Create Account</button>
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>
          Already have an account?{' '}<button type="button" style={linkBtnSt} onClick={onLogin}>Login</button>
        </div>
      </form>
    </ModalCard>
  );
}

type InquiryData = { name: string; email: string; phone: string; message: string };

function InquiryModal({ session, onSubmit, onClose }: {
  session: StoredSession; onSubmit: (d: InquiryData) => void; onClose: () => void;
}) {
  const [name, setName] = useState(session.name === 'Guest' ? '' : session.name);
  const [email, setEmail] = useState(session.email);
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [errs, setErrs] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ne: Record<string, string> = {};
    if (!name.trim()) ne.name = 'Name is required.';
    if (!email) ne.email = 'Email is required.';
    if (!phone) ne.phone = 'Phone is required.';
    if (!msg.trim()) ne.msg = 'Please add a message.';
    if (Object.keys(ne).length) { setErrs(ne); return; }
    onSubmit({ name: name.trim(), email, phone, message: msg.trim() });
  };
  return (
    <ModalCard title="Inquiry Details" subtitle="Tell us about your inquiry before viewing cart" onClose={onClose}>
      <form onSubmit={submit}>
        <input style={inputSt} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} autoFocus />
        <ErrMsg msg={errs.name} />
        <input style={inputSt} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <ErrMsg msg={errs.email} />
        <input style={inputSt} type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
        <ErrMsg msg={errs.phone} />
        <textarea style={{ ...inputSt, resize: 'vertical', minHeight: '85px' }} placeholder="Message or special notes" value={msg} onChange={e => setMsg(e.target.value)} />
        <ErrMsg msg={errs.msg} />
        <button type="submit" style={primaryBtnSt}>Submit & Go to Cart</button>
      </form>
    </ModalCard>
  );
}

// ─── Public stub ──────────────────────────────────────────────────────────────
export function HeaderMenu() { return null; }

// ─── Main Header ──────────────────────────────────────────────────────────────
export function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'login' | 'signup' | 'inquiry' | null>(null);
  const [currentSession, setCurrentSession] = useState<StoredSession | null>(null);

  const updateCounts = () => {
    const session = readSession();
    const userEmail = session?.email || 'guest';
    let totalCart = 0;
    Array.from(new Set(['guest', userEmail])).forEach((key) => {
      try {
        const raw = localStorage.getItem(`cart_${key}`);
        if (raw) { const items = JSON.parse(raw) as any[]; totalCart += items.reduce((a: number, i: any) => a + i.quantity, 0); }
      } catch {}
    });
    setCartCount(totalCart);

    try {
      const wl = localStorage.getItem(`wishlist_${userEmail}`);
      setWishlistCount(wl ? (JSON.parse(wl) as any[]).length : 0);
    } catch { setWishlistCount(0); }
  };

  useEffect(() => {
    updateCounts();
    setCurrentSession(readSession());
    window.addEventListener('storage', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const closeAll = () => { setCartDropdownOpen(false); setModalStep(null); };

  const handleCartIconClick = () => {
    const s = readSession(); setCurrentSession(s);
    setCartDropdownOpen(prev => !prev);
  };

  const handleGuestSelect = () => {
    setCartDropdownOpen(false);
    const g: StoredSession = { type: 'guest', name: 'Guest', email: '' };
    setCurrentSession(g); setModalStep('inquiry');
  };

  const handleCustomerSelect = () => {
    setCartDropdownOpen(false);
    const s = readSession();
    if (s && s.type === 'customer') { setCurrentSession(s); setModalStep('inquiry'); }
    else { setModalStep('login'); }
  };

  const handleLoginSuccess = (s: StoredSession) => {
    setCurrentSession(s); setModalStep('inquiry'); updateCounts();
  };

  const handleInquirySubmit = (data: InquiryData) => {
    if (!currentSession) return;
    try {
      const key = `inquiries_${currentSession.email || 'guest'}`;
      const arr = (() => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) as any[] : []; } catch { return []; } })();
      arr.push({ ...data, type: currentSession.type, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
    setModalStep(null);
    navigate('/cart');
  };

  const handleLogout = () => {
    clearSession(); setCurrentSession(null); closeAll(); updateCounts();
  };

  const isLoggedIn = !!(currentSession && currentSession.type === 'customer');

  const navLinks = [
    { name: 'Collections', path: 'Collections' },
    { name: 'Blog', path: 'Blog' },
    { name: 'About', path: 'About' },
    { name: 'Contact', path: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#1e2a47]/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Gem Mine" className="h-20 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={createPageUrl(link.path)}
                  className={({ isActive }) =>
                    `text-sm tracking-wider uppercase transition-colors duration-300 ${isActive
                      ? 'underline underline-offset-8 decoration-[#d4a89a] text-white'
                      : 'text-white hover:text-[#d4a89a]'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link to={createPageUrl('Wishlist')}>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#d4a89a] hover:bg-transparent relative">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#d4a89a] text-white text-xs border-none">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart icon — dropdown trigger */}
              <div style={{ position: 'relative' }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#d4a89a] hover:bg-transparent relative"
                  onClick={handleCartIconClick}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#d4a89a] text-white text-xs border-none">
                      {cartCount}
                    </Badge>
                  )}
                </Button>

                {cartDropdownOpen && (
                  <CartDropdown
                    isLoggedIn={isLoggedIn}
                    onGuest={handleGuestSelect}
                    onCustomer={handleCustomerSelect}
                    onViewCart={() => { closeAll(); navigate('/cart'); }}
                    onLogout={handleLogout}
                    onClose={() => setCartDropdownOpen(false)}
                  />
                )}
              </div>

              {/* Mobile menu trigger */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:text-amber-400 hover:bg-transparent"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Auth modals */}
      {modalStep === 'login' && (
        <LoginModal onSuccess={handleLoginSuccess} onSignup={() => setModalStep('signup')} onClose={closeAll} />
      )}
      {modalStep === 'signup' && (
        <SignupModal onSuccess={handleLoginSuccess} onLogin={() => setModalStep('login')} onClose={closeAll} />
      )}
      {modalStep === 'inquiry' && currentSession && (
        <InquiryModal session={currentSession} onSubmit={handleInquirySubmit} onClose={closeAll} />
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1a1a1a]"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <img src={logo} alt="Gem Mine" className="h-20 w-auto" />
                <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <NavLink
                      to={createPageUrl(link.path)}
                      className={({ isActive }) => `text-2xl transition-colors ${isActive ? 'text-white font-bold' : 'text-white hover:text-[#d4a89a]'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

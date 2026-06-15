import { FaSun,FaMoon } from "react-icons/fa";
export default function Navbar({ tab, setTab, dark, setDark }) {
  return (
    <nav
      className="sticky top-0 z-40 border-b"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--card-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--primary)' }}>
          ProDesk
        </span>

        <button
          onClick={() => setDark((d) => !d)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all"
          style={{ backgroundColor: 'var(--bg-alt)', color: 'var(--text)' }}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo">Nischal Ojha</a>
        <button
          className="navbar__menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li>
            <a
              href="https://github.com/nishnischal"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__github-link"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-border);
          height: var(--nav-height);
          display: flex;
          align-items: center;
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .navbar__logo {
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: var(--color-text);
        }
        .navbar__links {
          display: flex;
          gap: 32px;
          list-style: none;
          align-items: center;
        }
        .navbar__links a {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          transition: color 0.15s;
        }
        .navbar__links a:hover {
          color: var(--color-text);
        }
        .navbar__github-link {
          color: var(--color-accent) !important;
          font-weight: 500;
        }
        .navbar__menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .navbar__menu-btn span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--color-text);
          border-radius: 2px;
          transition: opacity 0.2s;
        }
        @media (max-width: 640px) {
          .navbar__menu-btn { display: flex; }
          .navbar__links {
            display: none;
            position: absolute;
            top: var(--nav-height);
            left: 0;
            right: 0;
            background: var(--color-bg);
            flex-direction: column;
            padding: 16px 24px 24px;
            border-bottom: 1px solid var(--color-border);
            gap: 20px;
            align-items: flex-start;
          }
          .navbar__links--open { display: flex; }
        }
      `}</style>
    </nav>
  )
}

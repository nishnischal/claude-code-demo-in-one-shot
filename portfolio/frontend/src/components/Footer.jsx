export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__copy">
          © {new Date().getFullYear()} Nischal Ojha
        </span>
        <a
          href="https://github.com/nishnischal"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          github.com/nishnischal
        </a>
      </div>
      <style>{`
        .footer {
          border-top: 1px solid var(--color-border);
          padding: 28px 0;
        }
        .footer__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer__copy {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }
        .footer__link {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          transition: color 0.15s;
        }
        .footer__link:hover {
          color: var(--color-accent);
        }
      `}</style>
    </footer>
  )
}

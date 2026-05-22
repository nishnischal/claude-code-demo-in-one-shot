export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">Hi, I'm</p>
        <h1 className="hero__name">Nischal Ojha</h1>
        <p className="hero__tagline">
          Software developer building clean, functional things for the web.
        </p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">View Projects</a>
          <a
            href="https://github.com/nishnischal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            GitHub Profile
          </a>
        </div>
      </div>
      <style>{`
        .hero {
          padding: 100px 0 80px;
          background: var(--color-bg);
        }
        .hero__inner {
          max-width: 680px;
        }
        .hero__eyebrow {
          font-size: 1rem;
          color: var(--color-accent);
          font-weight: 500;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }
        .hero__name {
          font-size: clamp(2.4rem, 6vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 20px;
          color: var(--color-text);
        }
        .hero__tagline {
          font-size: 1.2rem;
          color: var(--color-text-muted);
          max-width: 520px;
          margin-bottom: 36px;
          line-height: 1.7;
        }
        .hero__cta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 500;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn--primary {
          background: var(--color-accent);
          color: #fff;
        }
        .btn--primary:hover {
          background: var(--color-accent-hover);
        }
        .btn--secondary {
          background: transparent;
          color: var(--color-text);
          border: 1.5px solid var(--color-border);
        }
        .btn--secondary:hover {
          border-color: var(--color-text-muted);
        }
      `}</style>
    </section>
  )
}

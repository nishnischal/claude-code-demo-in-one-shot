export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <h2 className="section-title">About</h2>
        <div className="about__content">
          <p>
            I'm Nischal Ojha, a software developer with a passion for building
            practical, well-engineered applications. I enjoy working across the
            full stack — from designing clean APIs to crafting interfaces that
            are intuitive to use.
          </p>
          <p>
            My work spans web development, containerized deployments, and
            automation. I'm always learning and exploring new tools that make
            software more reliable and maintainable.
          </p>
          <div className="about__links">
            <a
              href="https://github.com/nishnischal"
              target="_blank"
              rel="noopener noreferrer"
              className="about__link"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .about {
          background: var(--color-bg);
        }
        .about__inner {
          max-width: 680px;
        }
        .about__content {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 24px;
        }
        .about__content p {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          line-height: 1.75;
        }
        .about__links {
          display: flex;
          gap: 20px;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .about__link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-accent);
          border-bottom: 1.5px solid transparent;
          transition: border-color 0.15s;
        }
        .about__link:hover {
          border-color: var(--color-accent);
        }
      `}</style>
    </section>
  )
}

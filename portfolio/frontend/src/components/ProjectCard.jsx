const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

export default function ProjectCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] || '#6b7280'

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-card__header">
        <svg className="project-card__icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z" />
        </svg>
        <span className="project-card__name">{repo.name.replace(/-/g, ' ')}</span>
      </div>
      <p className="project-card__desc">
        {repo.description || 'No description provided.'}
      </p>
      <div className="project-card__meta">
        {repo.language && (
          <span className="project-card__lang">
            <span className="project-card__lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="project-card__stars">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="project-card__forks">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />
            </svg>
            {repo.forks_count}
          </span>
        )}
      </div>
      <style>{`
        .project-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          background: var(--color-card-bg);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .project-card:hover {
          border-color: var(--color-accent);
          box-shadow: 0 4px 20px var(--color-card-shadow);
          transform: translateY(-2px);
        }
        .project-card__header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .project-card__icon {
          width: 16px;
          height: 16px;
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .project-card__name {
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-accent);
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .project-card__desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card__meta {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .project-card__lang {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .project-card__lang-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .project-card__stars,
        .project-card__forks {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .project-card__stars svg,
        .project-card__forks svg {
          width: 13px;
          height: 13px;
        }
      `}</style>
    </a>
  )
}

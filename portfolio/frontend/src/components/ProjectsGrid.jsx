import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'

const GITHUB_API = 'https://api.github.com/users/nishnischal/repos?sort=updated&per_page=20&type=public'

export default function ProjectsGrid() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(GITHUB_API)
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        const filtered = data.filter(r => !r.fork)
        setRepos(filtered)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          A selection of my public work on GitHub.
        </p>

        {loading && (
          <div className="projects__state">
            <div className="projects__spinner" aria-label="Loading projects" />
          </div>
        )}

        {error && (
          <div className="projects__state projects__error">
            <p>Couldn't load projects — {error}</p>
            <a href="https://github.com/nishnischal" target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="projects__state">
            <p>No public repositories found.</p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="projects__grid">
            {repos.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        .projects {
          background: var(--color-bg-alt);
        }
        .section-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .section-subtitle {
          color: var(--color-text-muted);
          font-size: 1rem;
          margin-bottom: 48px;
        }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .projects__state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 60px 0;
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }
        .projects__error a {
          color: var(--color-accent);
        }
        .projects__spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-accent);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

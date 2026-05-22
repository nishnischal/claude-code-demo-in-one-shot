# Contributing

Thanks for wanting to add a project! Here's the checklist.

## Adding a new project

1. **Create a folder** under `projects/<your-project-name>/`.

2. **Scaffold the project.** A minimal project should have:

   ```
   your-project-name/
   ├── README.md        ← required
   ├── package.json
   └── src/
   ```

3. **Write a `README.md`** that includes:
   - A one-line description
   - Stack table (layer → technology)
   - Folder structure
   - How to run locally (`npm install && npm run dev`)
   - Any environment variables (`.env.example` if needed)

4. **Update the root `README.md`** — add a row to the projects table.

5. **Update `projects/README.md`** — add a row to the existing projects table.

6. **Open a pull request** with the title: `feat: add <project-name>`.

## Style guide

- Prefer plain CSS over CSS frameworks for demos (keeps the code readable).
- Keep dependencies minimal — if the standard library or a fetch call works, use that.
- No build output or `node_modules/` in the PR (both are in `.gitignore`).

## Questions

Open a GitHub issue if you're unsure about anything.

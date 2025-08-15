# Contributing to Shaddy

Thank you for your interest in contributing to Shaddy! We welcome all kinds of contributions, including bug reports, feature requests, documentation improvements, and code enhancements.

## Getting Started

1. **Fork the repository** and clone it locally.
2. **Install dependencies** using [pnpm](https://pnpm.io/):
   ```bash
   pnpm install
   ```
3. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b my-feature-branch
   ```

## Development

- The main app code is in the `apps/` directory.
- Documentation lives in `apps/content/`.
- For the web app, see `apps/web/`.
- UI components and shared logic are in `apps/web/src/components/`.

To start the development server:

```bash
pnpm dev
```

## Making Changes

- Follow the existing code style and conventions.
- Write clear, concise commit messages.
- Add or update documentation as needed.
- If adding a new component or feature, provide usage examples and tests if possible.

## Commit Message Format

This project uses [Commitlint](https://commitlint.js.org/) to enforce [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages. Please use the following format for your commits:

```
<type>[optional scope]: <short description>

[optional body]

[optional footer(s)]
```

**Types:**

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

**Examples:**

```
feat(form): add password strength indicator
fix(ui): correct button alignment on mobile
docs: update contributing guidelines
```

Your PR will be blocked if your commit messages do not follow this format.

## Linting & Formatting

Run lint and format checks before submitting:

```bash
pnpm lint
pnpm format
```

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a pull request against the `main` branch.
3. Fill out the PR template and describe your changes.
4. Address any review feedback.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code. Please be respectful and considerate in all interactions and communications.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the maintainers.

## Need Help?

- Check the [README.md](./README.md) for project overview.
- Open an issue for questions or suggestions.

Thank you for helping make Shaddy better!

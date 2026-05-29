# Contributing to InjSight AI

Thank you for your interest in contributing! InjSight AI is open source and welcomes contributions from the Injective DeFi community.

## Development Setup

1. Fork the repository
2. Create a feature branch from `trunc`: `git checkout -b feature/your-feature`
3. Follow the Quick Start in the README
4. Make your changes with tests
5. Open a Pull Request targeting `trunc`

## Branch Strategy

- `trunc` — integration branch (submit PRs here)
- `feature/*` — feature branches (from `trunc`, merge back to `trunc`)
- `main` — legacy (do not use)

## Code Standards

- **Frontend:** TypeScript strict, no `any`, Tailwind design tokens only
- **Backend:** Python type hints, docstrings for public functions
- **Tests:** Add tests for new API endpoints
- **Commits:** Conventional commits (`feat:`, `fix:`, `docs:`)

## What We Need

- 🔗 More Injective token denom mappings
- 📊 New risk scoring dimensions
- 🌐 Translations (i18n)
- 🧪 More test coverage
- 📖 Documentation improvements

## Code of Conduct

Be respectful. No harassment. Build useful things.

# QA Automation Portfolio — Siarhei Patapau

Senior QA Automation Engineer with 13 years of experience in manual and automated testing of web, API and mobile products. Based in Poznań, Poland.

This repository is a working portfolio: each folder is a small, self-contained project that I built and run myself, with real tests, real CI and honest notes about what works and what does not.

## Contents

| Project | What it is | Status |
|---|---|---|
| [`ts-basics/`](./ts-basics) | TypeScript fundamentals — written as a Java engineer learning TypeScript: types, structural typing, unions, strict null checks | ✅ done |
| `playwright-e2e/` | End-to-end test framework: Playwright, Page Object Model, API tests, CI on GitHub Actions | 🚧 in progress |
| `llm-evals/` | LLM output validation: promptfoo / DeepEval, hallucination and injection checks in CI | ⏳ planned |
| self-healing | Healenium over Selenium — how locators repair themselves, and where that is dangerous | ⏳ planned |
| `mcp-triage/` | Automated defect triage: a failing test → LLM analysis → Jira issue via an MCP server | ⏳ planned |

## Working style

- Every project runs from a clean clone: `npm install` and one command to execute.
- CI is green, not decorative — workflows are committed and visible in the Actions tab.
- Notes are written down: where a tool helps, where it lies, and what I would do differently.

## Contact

- LinkedIn: [linkedin.com/in/siarhei-patapau](https://www.linkedin.com/in/siarhei-patapau/)

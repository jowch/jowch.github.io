---
name: EndeavorMCP
tagline: Live Pluto notebooks for the AI agent you already use.
summary: Run it on your laptop, a lab server or a cluster node. Your agent edits and runs a live notebook while you watch in the browser.
order: 3
layer: agent
language: Rust · Julia
status: Early release
accent: '#2f7f86'
logo: /projects/endeavor-mcp/icon.svg
repo: https://github.com/jowch/EndeavorMCP
install:
  label: Claude Code plugin
  code: |
    claude plugin marketplace add jowch/EndeavorMCP
    claude plugin install endeavor@endeavor
related: [endeavor]
---

## Keep your setup. Add an agent.

EndeavorMCP gives any MCP-capable agent (Claude Code, Codex, Gemini CLI and
others) a live Pluto notebook to work in. You start it yourself, the way you
start Pluto or Jupyter, in the folder where your notebooks live. The agent
edits and runs cells; you watch the same notebook in your browser and can step
in at any point.

Because the result is an ordinary Pluto notebook, the analysis stays
reproducible and readable after the agent is gone. Nothing is locked inside a
chat transcript.

## Where it runs

Anywhere Julia runs: your laptop, a workstation, a lab server or a Slurm
allocation. Logging in, ssh tunnels and job allocation stay with you or your
agent. When no `julia` is on the path, it downloads its own pinned Julia the
first time.

## Start a server

```
endeavor serve
```

`serve` prints the URL to open in your browser and the exact line to connect
your agent, for Claude Code, Codex, Gemini CLI or any client that speaks MCP
over HTTP. Prebuilt Linux binaries are on the
[releases page](https://github.com/jowch/EndeavorMCP/releases/tag/helpers),
or build from source with `cargo install`.

## Want it all in one app?

[Endeavor](/projects/endeavor/) is a Mac app built on the same tools, with
the agent and the notebook side by side and nothing to configure.

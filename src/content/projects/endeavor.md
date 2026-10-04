---
name: Endeavor
tagline: A Mac app with an AI agent beside a live Pluto notebook.
summary: The all-in-one way in. Endeavor sets up Julia and the agent for you, and keeps your notebook and the conversation side by side.
order: 4
layer: agent
language: Rust · macOS
status: In development
accent: '#e65a1e'
logo: /projects/endeavor/icon.svg
repo: https://github.com/jowch/Endeavor
install:
  label: Build from source
  code: |
    git clone https://github.com/jowch/Endeavor && cd Endeavor
    scripts/helpers.sh && cargo build && cargo run
related: [endeavor-mcp]
---

## Science first, setup never

Endeavor is a native macOS app that puts a Claude Code agent next to a live
Pluto.jl notebook. Ask a question in plain language; the agent writes and runs
cells in the notebook beside it, and you see every step as real, rerunnable
code.

On first launch it downloads and verifies Julia and Node.js and installs the
agent adapter, so there's nothing to configure before you start.

## Local or remote

Work on your Mac, or connect to a Linux server or cluster node and run the
notebook there, next to your data. The app installs its helper on the server
for you.

## You stay in control

By default the agent asks before running notebook code. Settings let you use
your own Julia, load your personal Claude Code setup, or let new sessions run
code without asking.

## Already have a setup you like?

[EndeavorMCP](/projects/endeavor-mcp/) is the same notebook tooling as a
plugin for the agent you already use, with no app required.

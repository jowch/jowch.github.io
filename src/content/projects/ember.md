---
name: Ember
tagline: Reactive notebooks for R.
summary: Change a cell and every cell that depends on it reruns, so what you see always matches the code. Notebooks are plain R scripts.
order: 2
layer: notebook
language: R
status: Early development
accent: '#e8590c'
logo: /projects/ember/logo.svg
repo: https://github.com/jowch/Ember
install:
  label: In R
  code: |
    # install.packages("pak")
    pak::pak("jowch/Ember")
related: [masque]
---

## No hidden state

In most notebooks, the output on screen is whatever happened to run last.
Ember reads each cell's code to work out which variables it defines and which
it uses, and keeps the notebook as a dependency graph. Edit a cell and the
cells downstream of it rerun. Delete a cell and its variables are gone. Cells
run in the order the graph needs, not the order they appear on the page.

## Reproducible by default

- **Notebooks are plain R scripts.** Cells are separated by comments and saved
  in the order they run, so `Rscript analysis.R` gives the notebook's results,
  the file diffs cleanly in git, and it opens in any editor.
- **Pinned packages.** Each notebook records the packages its code uses,
  pinned to a snapshot date, and Ember installs exactly those versions with
  renv. Move the date forward when you choose to update.
- **Safe to open.** A notebook opens in a safe preview: you can read it
  without running anything until you choose to.

## Pleasant to work in

Data frames as paged tables, lists as expandable trees, plots that redraw to
fit, htmlwidgets, autocomplete, and help pages in a side panel. The interface
is a fork of [Pluto.jl](https://plutojl.org)'s, adapted for R.

## Quick start

```r
nb <- ember::new_notebook("analysis.R")
ember::close_notebook(nb)

srv <- ember::start_server("analysis.R")   # opens in your browser
```

Click **Run notebook code** to leave safe preview, then write code.
Shift+Enter runs a cell.

> Ember is in early development and not yet on CRAN. Expect rough edges.

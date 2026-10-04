---
name: Masque.jl
tagline: Light, server-free interactivity for Makie plots in Pluto.
summary: Hover for tooltips, click to select, drag to pick a region, and get the result back in Julia. Works in static HTML exports too.
order: 1
layer: figure
language: Julia
status: Registered package
accent: '#b8893a'
logo: /projects/masque/logo.svg
logoDark: /projects/masque/logo-dark.svg
hero:
  src: /projects/masque/demo.gif
  alt: A CairoMakie scatter in Pluto. Hovering a point shows a tooltip; clicking it selects the point and updates the bound value in the next cell.
repo: https://github.com/jowch/Masque.jl
docs: https://jowch.github.io/Masque.jl/stable/
install:
  label: In a Pluto notebook
  code: using Masque, CairoMakie
related: [ember]
---

## Plots you can ask questions of

A static figure answers the question you had when you made it. Masque lets
the reader keep asking. It adds a thin JavaScript layer over a Makie figure in
Pluto: hovering an element shows a tooltip, and clicking it selects the
element and sends it to Julia through `@bind`, so the rest of the notebook
reacts.

The figure itself is still rendered by CairoMakie or WGLMakie as usual.
There's no plotting server to run and nothing to keep alive.

## What it covers

- Points, lines, heatmap cells, bars, polygons and text, on 2D, polar and 3D axes.
- Drag gestures: region of interest, threshold line, pan.
- Linked views, legends, readouts and custom tooltips.
- Tooltips and selection keep working in a static HTML export of the notebook,
  so a shared notebook stays explorable.

## Quick start

```julia
begin
    using Masque, CairoMakie
    fig = Figure()
    ax = Axis(fig[1, 1])
    s = scatter!(ax, [1.0, 2.0, 3.0], [1.0, 4.0, 9.0])
end

@bind sel masque(fig, interactables(s; payloads = ["a", "b", "c"]))
```

`sel` is `nothing` until a click, then an event carrying the payload of the
point you clicked. The [documentation](https://jowch.github.io/Masque.jl/stable/)
has the full guide and a gallery.

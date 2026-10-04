import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    summary: z.string(),
    order: z.number(),
    // Where the project sits in the stack diagram on the home page
    layer: z.enum(['agent', 'notebook', 'figure']),
    language: z.string(),
    status: z.string(),
    accent: z.string(),
    logo: z.string(),
    logoDark: z.string().optional(),
    hero: z.object({ src: z.string(), alt: z.string() }).optional(),
    repo: z.string().url(),
    docs: z.string().url().optional(),
    install: z.object({ label: z.string(), code: z.string() }),
    related: z.array(z.string()).default([]),
  }),
})

export const collections = { projects }

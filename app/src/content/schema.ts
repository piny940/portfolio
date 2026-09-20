import { z } from 'zod'

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

const runeLength = (value: string) => [...value].length

const isoDateTime = z.preprocess(
  value => (value instanceof Date ? value.toISOString() : value),
  z.string().min(1),
)

export const technologyEntrySchema = z.strictObject({
  slug: z.string().regex(SLUG, 'must be a lowercase kebab-case slug'),
  name: z.string().min(1),
  tagColor: z.string().regex(HEX_COLOR, 'must be a #rrggbb colour'),
  logo: z.string().min(1).optional(),
  proficiency: z.number().int().min(0).max(100).optional(),
})

export const projectEntrySchema = z.strictObject({
  id: z.string().regex(SLUG, 'must be a lowercase kebab-case slug'),
  title: z
    .string()
    .min(1)
    .refine(v => runeLength(v) <= 20, 'must be at most 20 characters'),
  description: z
    .string()
    .min(1)
    .refine(v => runeLength(v) <= 80, 'must be at most 80 characters'),
  isFavorite: z.boolean().default(false),
  links: z
    .strictObject({
      app: z.string().min(1).optional(),
      github: z.string().min(1).optional(),
      qiita: z.string().min(1).optional(),
    })
    .default({}),
  tags: z.array(z.string()).default([]),
})

export const blogEntrySchema = z.strictObject({
  title: z.string().min(1),
  url: z.string().min(1),
  publishedAt: isoDateTime,
  tags: z.array(z.string()).default([]),
})

export const profileEntrySchema = z.strictObject({
  name: z.string().min(1),
  handle: z.string().min(1),
  description: z.string().min(1),
  links: z.strictObject({
    github: z.string().min(1),
    qiita: z.string().min(1),
    x: z.string().min(1),
  }),
})

export const technologiesFileSchema = z.array(technologyEntrySchema)
export const projectsFileSchema = z.array(projectEntrySchema)
export const blogsFileSchema = z.array(blogEntrySchema)

export type TechnologyEntry = z.infer<typeof technologyEntrySchema>
export type ProjectEntry = z.infer<typeof projectEntrySchema>
export type BlogEntry = z.infer<typeof blogEntrySchema>
export type ProfileEntry = z.infer<typeof profileEntrySchema>

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    lang: z.enum(['en', 'es']),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  writing: writingCollection,
};

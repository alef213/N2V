import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const ebooks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ebooks' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    length: z.string(),
    readTime: z.string(),
    downloadFile: z
      .string()
      .startsWith('/', 'downloadFile must be a site-relative path (start with /)'),
    thumbnailTone: z.enum(['navy', 'teal', 'green', 'gold', 'charcoal']).default('teal'),
    order: z.number().default(100),
    highlights: z.array(z.string()).optional(),
    thumbnailFile: z.string().optional(),
    checklistName: z.string().optional(),
  }),
});

export const collections = { ebooks };

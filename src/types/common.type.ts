import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const ListInputSchema = z.object({
  limit: z.coerce.number().optional().default(10).openapi({
    description: 'Maximum number of items to return',
    example: 10,
  }),
  offset: z.coerce.number().optional().default(0).openapi({
    description: 'Number of items to skip from the beginning',
    example: 0,
  }),
});

export const ListResponseSchema = z.object({
  total: z.number().openapi({
    description: 'Total number of available items (not paginated)',
    example: 58,
  }),
  limit: z.number().openapi({
    description: 'Maximum number of items returned',
    example: 10,
  }),
  offset: z.number().openapi({
    description: 'Number of skipped items',
    example: 0,
  }),
  count: z.number().optional().openapi({
    description: 'Number of items returned in this page',
    example: 10,
  }),
  data: z.array(z.record(z.any())).openapi({
    description: 'List of paginated items',
    example: [{ id: 'abc123', name: 'Item A' }],
  }),
});

export type ListInput = z.infer<typeof ListInputSchema>;
export type ListResponse = z.infer<typeof ListResponseSchema>;

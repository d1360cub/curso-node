import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required.',
    invalid_type_error: 'Movie title must be a string',
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string({
    required_error: 'Director is required.',
  }),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(z.enum(['Action', 'Drama', 'Comedy']), {
    required_error: 'Movie genre is required.',
    invalid_type_error: 'Movie genre must be an array of enum Genre',
  }),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    // Optional environment variable for development mode, is automatically set according to vite run mode
    DEV: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional(),
    COGNITO_AUTHORITY: z.string(),
    COGNITO_CLIENT_ID: z.string(),
    COGNITO_REDIRECT_URI: z.string(),
    COGNITO_RESPONSE_TYPE: z.string(),
    COGNITO_SCOPE: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
        The following variables are missing or invalid:
        ${Object.entries(parsedEnv.error.flatten().fieldErrors)
          .map(([k, v]) => `- ${k}: ${v}`)
          .join('\n')}
      `,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();

import { type ZodType, z } from 'zod'

type InferSchemaType<T extends ZodType> = z.infer<T>

type CreateEnvType<T extends ZodType> = {
  schemas: T
  runTimeEnv: InferSchemaType<T>
  clientEnvPrefix?: string
}

/**
 * Validates and parses environment variables using a Zod schema.
 *
 * This function should be used to ensure your environment variables are present and valid
 * according to the provided Zod schema. It supports both server and client environments.
 *
 * @template T - The Zod schema type.
 * @param {Object} params - The configuration object.
 * @param {T} params.schemas - The Zod schema to validate against.
 * @param {z.infer<T>} params.runTimeEnv - The environment variables object to validate.
 * @param {string} [params.clientEnvPrefix='NEXT_PUBLIC_'] - The prefix for client-exposed variables (default: 'NEXT_PUBLIC_').
 * @returns {z.infer<T>} The validated environment variables object.
 *
 * @example
 * import { createEnv } from '@sl/utils/createEnv';
 * import { z } from 'zod';
 *
 * export const env = createEnv({
 *   schemas: z.object({
 *     USER_SPACE_APP_URL: z.string().url().min(1),
 *   }),
 *   runTimeEnv: {
 *     USER_SPACE_APP_URL: process.env.USER_SPACE_APP_URL,
 *   }
 * });
 */
export const createEnv = <T extends ZodType>({
  schemas,
  runTimeEnv,
  clientEnvPrefix = 'NEXT_PUBLIC_',
}: CreateEnvType<T>): z.infer<T> => {
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    const clientEnv: Record<string, string | undefined> = {}
    Object.entries(runTimeEnv as Record<string, string | undefined>).forEach(
      ([key, value]) => {
        if (key.startsWith(clientEnvPrefix)) {
          clientEnv[key] = value as string
        }
      }
    )

    const parsed = schemas.safeParse(clientEnv)
    if (!parsed.success) {
      console.error(
        '❌ Invalid client environment variables:',
        z.treeifyError(parsed.error)
      )
      throw new Error('Invalid client environment variables')
    }
    return parsed.data
  }

  const parsed = schemas.safeParse(runTimeEnv)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format())
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

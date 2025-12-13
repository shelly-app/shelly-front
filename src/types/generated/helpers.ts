/**
 * Helper types to extract types from the generated OpenAPI schema
 *
 * Usage examples:
 * ```typescript
 * // Get response type for GET /pets
 * type PetsResponse = ApiResponse<"/pets", "get">;
 *
 * // Get request body type for POST /pets
 * type CreatePetRequest = ApiRequestBody<"/pets", "post">;
 *
 * // Get a component/schema type
 * type Pet = components["schemas"]["Pet"];
 * ```
 */

import type { paths, components } from "./api";

/**
 * Extract the successful response type from an API endpoint
 */
export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  responses: { 200: { content: { "application/json": infer R } } };
}
  ? R
  : never;

/**
 * Extract the request body type from an API endpoint
 */
export type ApiRequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  requestBody?: { content: { "application/json": infer R } };
}
  ? R
  : never;

/**
 * Extract path parameters type from an API endpoint
 */
export type ApiPathParams<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { path: infer P } } ? P : never;

/**
 * Extract query parameters type from an API endpoint
 */
export type ApiQueryParams<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends { parameters: { query: infer Q } } ? Q : never;

/**
 * Re-export components for easier access to schemas
 */
export type { components, paths };

# Generated API Types

This directory contains TypeScript types automatically generated from the backend's OpenAPI specification.

## Generating Types

To regenerate the types from the backend:

```bash
# Make sure the backend is running first
cd ../../../back
pnpm dev

# In a new terminal, generate types
cd ../shelly-front
pnpm generate:types
```

## Usage

### Using Helper Types

The helper types make it easy to extract request/response types:

```typescript
import type { ApiResponse, ApiRequestBody } from "@/types/generated";

// Get the response type for GET /pets
type GetPetsResponse = ApiResponse<"/pets", "get">;

// Get the request body type for POST /pets
type CreatePetRequest = ApiRequestBody<"/pets", "post">;

// Get query parameters for an endpoint
type PetFilters = ApiQueryParams<"/pets", "get">;
```

### Using Component Schemas

If the backend defines reusable schemas, you can access them directly:

```typescript
import type { components } from "@/types/generated";

type Pet = components["schemas"]["Pet"];
type User = components["schemas"]["User"];
```

### Using Path Types Directly

For advanced use cases, you can use the paths directly:

```typescript
import type { paths } from "@/types/generated";

type PetsEndpoint = paths["/pets"];
type GetPets = paths["/pets"]["get"];
```

## Important Notes

- **DO NOT** edit files in this directory manually - they are auto-generated
- Files in this directory **are committed to git** for deployment reliability
- Always regenerate types after backend schema changes and commit them
- Make sure the backend server is running when generating types

## Why Commit Generated Types?

- ✅ Frontend builds don't depend on backend being accessible
- ✅ Simpler CI/CD - just `pnpm build` works
- ✅ Clear history of what types were deployed
- ✅ Works offline
- ✅ Faster deployments

## Integration with API Client

Example of using generated types with axios:

```typescript
import { api } from "@/lib/api-client";
import type { ApiResponse } from "@/types/generated";

export const petApi = {
  getPets: async () => {
    type Response = ApiResponse<"/pets", "get">;
    const response = await api.get<Response>("/pets");
    return response.responseObject;
  }
};
```

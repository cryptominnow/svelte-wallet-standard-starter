Todo:

- refactor readonly properties with z.readonly
- refactor standard schema definitions to match the source
- make refactors to match ALL definitions to source (even for something as granular as versions, for the use of external libs)
- figure out and implement validating variadic function rest arguments
- refine some schemas where more specific validation can improve catching errors (e.g. IdentifierString)
- refactor all schemas snake case
- export everything!
- z.default() on inferred nullable hash types??
- refactor optional properties to z.optional()
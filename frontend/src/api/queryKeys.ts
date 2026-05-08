export const equipmentKeys = {
  // parent key - mathches all equipment queries
  all: () => ["equipment"] as const,

  // list queries - GET /equipment with any filters
  lists: () => ["equipment", "list"] as const,

  // specific list with filters
  list: (filters: { type?: string; make?: string }) =>
    ["equipment", "list", filters] as const,

  // detail queries - GET /equipment/:id
  details: () => ["equipment", "detail"] as const,

  // specific detail by id
  detail: (id: number) => ["equipment", "detail", id] as const,
};

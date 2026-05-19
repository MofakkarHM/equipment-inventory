export const equipmentKeys = {
    // parent key - mathches all equipment queries
    all: () => ["equipment"],
    // list queries - GET /equipment with any filters
    lists: () => ["equipment", "list"],
    // specific list with filters
    list: (filters) => ["equipment", "list", filters],
    // detail queries - GET /equipment/:id
    details: () => ["equipment", "detail"],
    // specific detail by id
    detail: (id) => ["equipment", "detail", id],
};

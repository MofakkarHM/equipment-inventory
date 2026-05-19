const BASE_URL = "http://localhost:3001";
// fetch with error handling
async function apiFetch(path, options) {
    const res = await fetch(`${BASE_URL}${path}`, options);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message ??
            `Request failed with status ${res.status}`);
    }
    // handle 204 No Content
    if (res.status === 204) {
        return undefined;
    }
    const json = await res.json();
    return json.data;
}
export async function fetchEquipment(filters = {}) {
    const query = new URLSearchParams();
    if (filters.type)
        query.append("type", filters.type);
    if (filters.make)
        query.append("make", filters.make);
    if (filters.search)
        query.append("search", filters.search);
    const queryString = query.toString();
    const path = queryString ? `/equipment?${queryString}` : "/equipment";
    return apiFetch(path);
}
export async function fetchEquipmentById(id) {
    return apiFetch(`/equipment/${id}`);
}
// mutation functions
export async function deleteEquipment(id) {
    await apiFetch(`/equipment/${id}`, {
        method: "DELETE",
    });
}
export async function createEquipment(data) {
    return apiFetch("/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

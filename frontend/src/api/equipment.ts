import { ApiResponse, Equipment } from "../types";

const BASE_URL = "http://localhost:3001";

//fetch wit error handling
async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message ??
        `Request failed with status ${res.status}`,
    );
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

//public API functions
export interface EquipmentFilters {
  type?: string;
  make?: string;
  search?: string;
}

export async function fetchEquipment(
  filters: EquipmentFilters = {},
): Promise<Equipment[]> {
  const query = new URLSearchParams();

  if (filters.type) query.append("type", filters.type);
  if (filters.make) query.append("make", filters.make);
  if (filters.search) query.append("search", filters.search);

  const queryString = query.toString();
  const path = queryString ? `/equipment?${queryString}` : "/equipment";

  return apiFetch<Equipment[]>(path);
}

export async function fetchEquipmentById(id: number): Promise<Equipment> {
  return apiFetch<Equipment>(`/equipment/${id}`);
}

import { ApiResponse, Equipment } from "../types";

const BASE_URL = "http://localhost:3001";

// fetch with error handling
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message ??
        `Request failed with status ${res.status}`,
    );
  }

  // handle 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

// public API functions
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

// mutation functions
export async function deleteEquipment(id: number): Promise<void> {
  await apiFetch(`/equipment/${id}`, {
    method: "DELETE",
  });
}

export async function createEquipment(data: {
  name: string;
  type: string;
  make: string;
  model: string;
  tag: string;
  location: string;
  status: string;
}): Promise<Equipment> {
  return apiFetch<Equipment>("/equipment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

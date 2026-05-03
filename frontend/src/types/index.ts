export interface Equipment {
  id: number;
  name: string;
  type: string;
  make: string;
  model: string;
  tag: string;
  location: string;
  status: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

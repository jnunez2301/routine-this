export interface ApiResponse {
  success: boolean;
  message: string;
  data: unknown;
  token?: string;
}
export interface iApiResponse {
  success: boolean;
  message: string;
  token?: string;
}

function ApiResponse(success: boolean, message: string, token?: string): iApiResponse{
  return  {
    success: success,
    message: message,
    token: token
  }
}

export default ApiResponse;

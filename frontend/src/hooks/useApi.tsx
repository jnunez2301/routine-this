/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { useSession } from "../context/auth/context";
import { apiUrl } from "../environment";
import { ApiResponse } from "../model/ApiResponse";
import { useNavigate } from "@tanstack/react-router";

export const sessionTokenName = "session-2001";

const useApi = () => {
  const { clearSession } = useSession();
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem(sessionTokenName);
  function checkForbidden(response: Response) {
    if (response.status === StatusCodes.FORBIDDEN) {
      if(window.location.pathname.includes('auth')){
        return;
      }
      clearSession();
      window.alert("You are not allowed to see this content")
      navigate({to: '/'})
      return;
    } else if(response.status === StatusCodes.TOO_MANY_REQUESTS){
      alert("Too many requests")
    }
  }

  async function get(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      checkForbidden(response);

      const data = response.json();

      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function post(endpoint: string, requestData: any): Promise<ApiResponse> {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        credentials: "include",
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      checkForbidden(response);
      const data: ApiResponse = await response.json();

      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  return {
    get,
    post
  };
};

export default useApi;

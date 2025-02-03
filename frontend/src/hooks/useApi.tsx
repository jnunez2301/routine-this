/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { useSession } from "../context/auth/context";
import { apiUrl } from "../environment";
import { ApiResponse } from "../model/ApiResponse";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useToast } from "../context/toast/context";

export const sessionTokenName = "session-2001";

type ApiOptions = {
  avoidClear?: boolean, // User session wont be cleared if set and the path is forbidden,
  hideToast?: boolean, // Toast will be hidden if set
}

const useApi = () => {
  const { clearSession } = useSession();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const jwtToken = localStorage.getItem(sessionTokenName);

  function checkForbidden(response: Response) {
    if (response.status === StatusCodes.FORBIDDEN) {
      if (window.location.pathname.includes("auth")) {
        return;
      }
      clearSession();
      if (
        location.pathname === "" ||
        location.pathname === "/" ||
        location.pathname.includes("public")
      ) {
        return;
      }
      navigate({ to: "/" });
      toast.setMessage({
        detail: "You are not allowed to see this content",
        severity: "danger",
      });
      return;
    } else if (response.status === StatusCodes.TOO_MANY_REQUESTS) {
      toast.setMessage({ detail: "Too many requests", severity: "danger" });
    }
  }

  async function get(endpoint: string, options: ApiOptions): Promise<ApiResponse> {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if(!options.avoidClear){
        checkForbidden(response);
      }

      const data = response.json();

      return data;
    } catch (error) {
      if(!options.hideToast){
        toast.setMessage({
          detail: "Internal server error, please try again later",
          severity: "danger",
        });
      }
      throw new Error(String(error));
    }
  }

  async function post(
    endpoint: string,
    requestData: any
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      checkForbidden(response);
      const data: ApiResponse = await response.json();
      toast.setMessage({
        detail: data.message,
        severity: data.success ? "success" : "danger",
      });
      return data;
    } catch (error) {
      toast.setMessage({
        detail: "Internal server error, please try again later",
        severity: "danger",
      });
      throw new Error(String(error));
    }
  }
  return {
    get,
    post,
  };
};

export default useApi;

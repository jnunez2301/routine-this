/* eslint-disable react-refresh/only-export-components */
import React, { createContext, PropsWithChildren, useState } from "react";

export type ToastMessage  = {
  detail: string;
  severity: 'success'  | 'info' | 'danger';
  time?: number;
}

type ToastContextState = {
  toastMessage: ToastMessage | null;
  setMessage: (msg: ToastMessage) => void;
  clearMessage: () => void;
}

export const ToastContext = createContext<ToastContextState | undefined>(undefined);

export const Toaster: React.FC<PropsWithChildren> = ({children}) => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  function setMessage(msg: ToastMessage){
    setToastMessage(msg);
  }
  function clearMessage(){
    setToastMessage(null);
  }
  const values: ToastContextState = {
    toastMessage,
    setMessage,
    clearMessage,
  }
  return <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
}
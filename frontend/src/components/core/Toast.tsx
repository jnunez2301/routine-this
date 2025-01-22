import { useEffect } from "react";
import { useToast } from "../../context/toast/context";
import styled, { keyframes } from "styled-components";

const fromBottomToTop = keyframes`
  0%{
    opacity: .5;
    transform: translateY(20px);
  } 100%{
    opacity: 1;
    transform: translateY(0);
  }
`
const ToastContainer = styled.div`
  position: absolute;
  overflow: auto;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 10px 10px 3px rgba(0, 0, 0, 0.2);
  animation: ${fromBottomToTop} .2s ease-in-out;
`;
// TODO: Create a damn toaster!!!
const Toast = () => {
  // 1. Create in DOM a positioned absolute div
  // 2. Set a timer
  // 3. Once timer ends the item is removed from the dom
  const { clearMessage, toastMessage } = useToast();
  function getMessageSeverityColor(str: "success" | "info" | "danger") {
    switch (str) {
      case "info":
        return "blue";
      case "danger":
        return "red";
      case "success":
        return "green";
      default:
        return "cyan";
    }
  }
  function getMessageSeverityHeader(str: "success" | "info" | "danger") {
    switch (str) {
      case "info":
        return "Info";
      case "danger":
        return "There was an error!";
      case "success":
        return "Success";
      default:
        return "Info";
    }
  }
  useEffect(() => {
    if (toastMessage) {
      const endTime = toastMessage.time ? toastMessage.time : 2000;
      const timer = setTimeout(() => {
        clearMessage();
      }, endTime);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  return toastMessage ? (
    <ToastContainer
      id="toast"
      className="lg:w-[310px] w-[250px] h-[150px] mr-5 mb-5 rounded-md p-4 flex gap-2"
      style={{
        color: getMessageSeverityColor(toastMessage.severity),
      }}
    >
      <div id="toast-left-bar" className="w-[1px] opacity-10" style={{backgroundColor: getMessageSeverityColor(toastMessage.severity)}}></div>
      <div id="toast-content">
        <span className="absolute right-2 top-0 font-bold text-black cursor-pointer hover:opacity-50" onClick={clearMessage}>x</span>
        <h2 className="font-bold">{getMessageSeverityHeader(toastMessage.severity)}</h2>
        <p style={{color: "black"}}>{toastMessage.detail}</p>
      </div>
    </ToastContainer>
  ) : null;
};

export default Toast;

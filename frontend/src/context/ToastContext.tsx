import { useState, useEffect, useCallback, createContext } from "react";
import Toast from "../components/Toast";
import { IToast } from "../model/toast";
import { useId } from "react";

const ToastContext = createContext({});
export default ToastContext;

interface IProps {
  children: JSX.Element;
}
export function ToastContextProvider({ children }: IProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts: IToast[]) => toasts.slice(1)),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const open = useCallback(
    function (toast: IToast) {
      setToasts((toasts: IToast[]) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ open }}>
      {children}
      <div className="absolute bottom-5 left-5">
        {toasts.map((toast: any, index: number) => (
          <Toast key={index} message={toast.message} status={toast.status} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

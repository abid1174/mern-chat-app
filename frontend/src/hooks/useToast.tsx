import { useContext } from "react";

import ToastContext from "../context/ToastContext";

export default function useToast() {
  return useContext(ToastContext);
}

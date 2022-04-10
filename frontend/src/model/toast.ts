type StatusType = "success" | "warning" | "error" | "default";

export interface IToast {
  message: string;
  status: StatusType;
  delay?: number;
}

"use client";

import * as Toast from "@radix-ui/react-toast";
import styles from "./ToastMessage.module.scss";

type ToastMessageProps = {
  title: string;
  description: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  status: "success" | "error" | null;
};

const ToastMessage: React.FC<ToastMessageProps> = (props) => {
  return (
    <Toast.Root
      className={styles.ToastRoot}
      open={props.open}
      onOpenChange={props.setOpen}
    >
      <Toast.Title className={styles.ToastTitle} data-status={props.status ?? ""}>
        {props.title}
      </Toast.Title>
      <Toast.Description className={styles.ToastDescription}>
        {props.description}
      </Toast.Description>
    </Toast.Root>
  );
};
export default ToastMessage;

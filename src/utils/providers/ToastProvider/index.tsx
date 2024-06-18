"use client";

import React from "react";
import * as Toast from "@radix-ui/react-toast";
import styles from "./ToasterProvider.module.scss";
import ToastMessage from "@/components/molecules/ToastMessage";
import { useToastStore } from "@/utils/zustand/toast.store";

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastProvider: React.FC<ToastProviderProps> = (props) => {
  const { open, title, description, status, duration, setOpen } =
    useToastStore();

  return (
    <Toast.Provider swipeDirection="left" duration={duration}>
      {props.children}
      <ToastMessage
        open={open}
        setOpen={setOpen}
        title={title}
        description={description}
        status={status}
      />
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
};

export default ToastProvider;

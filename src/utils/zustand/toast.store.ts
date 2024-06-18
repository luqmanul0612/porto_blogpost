import { create } from "zustand";

type State = {
  title: string;
  description: string;
  open: boolean;
  status: "success" | "error" | null;
  duration?: number;
};

type Actions = {
  toast: {
    success: (value: Omit<State, "open" | "status" | "duration">) => void;
    error: (value: Omit<State, "open" | "status" | "duration">) => void;
  };
  setOpen: (value: boolean) => void;
};

export const useToastStore = create<State & Actions>((set) => ({
  open: false,
  title: "",
  description: "",
  status: null,
  duration: 3000,
  toast: {
    success: (value) =>
      set({
        open: true,
        title: value.title,
        description: value.description,
        status: "success",
      }),
    error: (value) =>
      set({
        open: true,
        title: value.title,
        description: value.description,
        status: "error",
      }),
  },
  setOpen: (value) => set({ open: value }),
}));

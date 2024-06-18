import * as Dialog from "@radix-ui/react-dialog";
import React, { useLayoutEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./validationSchema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import styles from "./UserUpdateModal.module.scss";
import { useToastStore } from "@/utils/zustand/toast.store";
import { updateUser } from "@/utils/services";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CircleLoading from "@/components/atoms/Loading/CircleLoading";
import TextField from "@/components/atoms/TextField";
import RadioGroup from "@/components/atoms/RadioGroup";
import Radio from "@/components/atoms/Radio";
import Button from "@/components/atoms/Button";
import { GetUser } from "@/utils/services/services.type";

type Schema = z.infer<typeof validationSchema>;

type UserUpdateModalProps = {
  defaultValues: GetUser | null;
  open: boolean;
  onClose: () => void;
  page: number;
};

const status = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const UserUpdateModal: React.FC<UserUpdateModalProps> = (props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToastStore((state) => state.toast);

  const user = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success({
        title: "Success",
        description: "User updated successfully",
      });
      const params = new URLSearchParams();
      params.set("page", "1");
      router.push(`/users?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      props.onClose();
    },
    onError: () => {
      toast.error({
        title: "Failed",
        description: "Something went wrong",
      });
    },
  });

  const form = useForm<Schema>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      status: "",
    },
    resolver: zodResolver(validationSchema),
  });

  useLayoutEffect(() => {
    form.reset({
      email: props.defaultValues?.email ?? "",
      name: props.defaultValues?.name ?? "",
      status: props.defaultValues?.status ?? "",
    });
  }, [props.defaultValues]);

  const onSubmit = form.handleSubmit((values) => {
    user.mutate({
      variables: {
        email: values.email,
        name: values.name,
        status: values.status,
        userId: props.defaultValues?.id!,
      },
    });
  });

  return (
    <Dialog.Root open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.dialogHeader}>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close"
                onClick={props.onClose}
              >
                <X size={25} />
              </button>
            </div>
            <Dialog.Title className={styles.dialogTitle}>
              Update User
            </Dialog.Title>
            <div className={styles.inputWrapper}>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextField
                    label="Name"
                    placeholder="Type name here"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextField
                    label="Email"
                    placeholder="Type email here"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <RadioGroup
                    label="Status"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {status.map((item) => (
                      <Radio
                        key={item.value}
                        value={item.value}
                        label={item.label}
                        id={`status-${item.value}`}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button onClick={props.onClose} variant="soft">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  user.isPending ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
              >
                Update {user.isPending && <CircleLoading />}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UserUpdateModal;

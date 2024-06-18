import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import styles from "./UserDeleteModal.module.scss";
import { useToastStore } from "@/utils/zustand/toast.store";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CircleLoading from "@/components/atoms/Loading/CircleLoading";
import { deleteUser } from "@/utils/services";
import Button from "@/components/atoms/Button";

type UserDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  userId: number | null;
};

const UserDeleteModal: React.FC<UserDeleteModalProps> = (props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToastStore((state) => state.toast);

  const user = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success({
        title: "Success",
        description: "User deleted successfully",
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

  return (
    <Dialog.Root open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <div className={styles.content}>
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
              Delete Confirmation
            </Dialog.Title>
            <Dialog.Description className={styles.dialogDescription}>
              {`Delete User ${props.userId}`}
            </Dialog.Description>
            <div className={styles.buttonWrapper}>
              <Button onClick={props.onClose} variant="soft">
                Cancel
              </Button>
              <Button
                className={styles.delete}
                disabled={user.isPending}
                onClick={() =>
                  user.mutate({ variables: { userId: props.userId! } })
                }
              >
                Delete {user.isPending && <CircleLoading />}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UserDeleteModal;

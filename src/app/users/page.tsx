"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getComments, getPost, getUser, getUsers } from "@/utils/services";
import { Plus, Search } from "lucide-react";
import styles from "./users.module.scss";
import Button from "@/components/atoms/Button";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { GetUser } from "@/utils/services/services.type";
import CircleLoading from "@/components/atoms/Loading/CircleLoading";
import Pagination from "@/components/molecules/Pagination";
import UserCreateModal from "@/components/organisms/Modal/UserCreateModal";
import TextField from "@/components/atoms/TextField";
import useDebounce from "@/utils/hooks/use-debounce";
import UserEditModal from "@/components/organisms/Modal/UserUpdateModal";
import UserDeleteModal from "@/components/organisms/Modal/UserDeleteModal";

type UpdateUser = {
  open: boolean;
  data: GetUser | null;
};

type DeleteUser = {
  open: boolean;
  userId: number | null;
};

type ColumnType = {
  key: string;
  label: string;
  render?: (value: string, record: GetUser) => ReactNode;
};

const Post = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [createUser, setCreateUser] = useState(false);
  const [search, setSearch] = useState("");
  const [updateUser, setUpdateUser] = useState<UpdateUser>({
    open: false,
    data: null,
  });
  const [deleteUser, setDeleteUser] = useState<DeleteUser>({
    open: false,
    userId: null,
  });

  useEffect(() => {
    setPage(queryPage ? Number(queryPage) : 1);
  }, [queryPage]);

  const searchValue = useDebounce<string>(search, 1000);
  const users = useQuery({
    queryKey: ["users", page, searchValue],
    queryFn: () =>
      getUsers({ variables: { page, take: 10, search: searchValue } }),
  });

  useEffect(() => {
    if (users.data) setCount(users?.data?.numberOfPages ?? 0);
  }, [users.data]);

  const onChangePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    router.push(`/users?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  const columns = useMemo<ColumnType[]>(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Name",
      },
      {
        key: "gender",
        label: "Gender",
      },
      {
        key: "email",
        label: "Email",
      },
      {
        key: "status",
        label: "Status",
        render: (value) => (
          <div className={styles.status} data-status={value}>
            {value === "active" ? "Active" : "Inactive"}
          </div>
        ),
      },
      {
        key: "action",
        label: "",
        render: (_, record) => (
          <div className={styles.tableAction}>
            <button
              className={styles.edit}
              onClick={() => setUpdateUser({ open: true, data: record })}
            >
              Edit
            </button>
            <button
              className={styles.delete}
              onClick={() => setDeleteUser({ open: true, userId: record.id })}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [users.data?.result]
  );

  const tableData = users.data?.result ?? [];

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <p className={styles.title}>Users Management</p>
        <div className={styles.action}>
          <div>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startIcon={<Search size={20} stroke="#94a3b8" />}
              placeholder="Search"
            />
            <Button startIcon={<Plus />} onClick={() => setCreateUser(true)}>
              Add
            </Button>
          </div>
          <p>
            {!!users.data &&
              `Page ${page}/${users.data?.numberOfPages ?? 0} of ${
                users.data?.numberOfItems ?? 0
              } results.`}
          </p>
        </div>
        <div className={styles.contentCard}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render
                          ? col.render(
                              (item as { [key: string]: any })[col.key],
                              item
                            )
                          : (item as { [key: string]: any })[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {users.isLoading && (
              <div className={styles.loadingWrapper}>
                <CircleLoading height="50px" width="50px" />
              </div>
            )}
            {!users.isLoading && !tableData?.length && (
              <div className={styles.noData}>No Data</div>
            )}
          </div>
          <div className={styles.pagination}>
            <Pagination
              value={page}
              onChange={(page) => onChangePage(page)}
              count={count}
              isLoading={users.isLoading && !count}
            />
          </div>
        </div>
      </div>
      <UserCreateModal
        open={createUser}
        onClose={() => setCreateUser(false)}
        page={page}
      />
      <UserEditModal
        defaultValues={updateUser.data}
        open={updateUser.open}
        onClose={() => setUpdateUser((prev) => ({ ...prev, open: false }))}
        page={page}
      />
      <UserDeleteModal
        open={deleteUser.open}
        onClose={() => setDeleteUser({ open: false, userId: null })}
        userId={deleteUser.userId}
      />
    </main>
  );
};

export default Post;

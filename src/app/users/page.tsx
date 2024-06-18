import UsersPage from "@/containers/UsersPage";
import { Suspense } from "react";

const Users = () => {
  return (
    <Suspense>
      <UsersPage />
    </Suspense>
  );
};

export default Users;

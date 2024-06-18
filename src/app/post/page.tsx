import { Suspense } from "react";
import DetailPostPage from "@/containers/DetailPostPage";

const Post = () => {
  return (
    <Suspense>
      <DetailPostPage />
    </Suspense>
  );
};

export default Post;

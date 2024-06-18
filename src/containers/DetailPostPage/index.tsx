"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getComments, getPost, getUser } from "@/utils/services";
import { ChevronLeft } from "lucide-react";
import PostDetailLoading from "@/components/atoms/Loading/PostDetailLoading";
import { PostUserLoading } from "@/components/atoms/Loading/PostLoading";
import PostCommetsLoading from "@/components/atoms/Loading/PostCommetsLoading";
import styles from "./DetailPostPage.module.scss";
import Button from "@/components/atoms/Button";

const DetailPostPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const post = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost({ variables: { postId: Number(postId) } }),
  });

  const [user, comments] = useQueries({
    queries: [
      {
        queryKey: ["user", postId],
        queryFn: () =>
          getUser({ variables: { userId: Number(post.data?.user_id) } }),
        enabled: !!post.data?.id,
      },
      {
        queryKey: ["comments", postId],
        queryFn: () =>
          getComments({ variables: { postId: Number(post.data?.id) } }),
        enabled: !!post.data?.id,
      },
    ],
  });

  const onClickBack = () => router.back();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Button
          variant="soft"
          startIcon={<ChevronLeft size={20} />}
          onClick={onClickBack}
        >
          Back
        </Button>{" "}
        <div className={styles.contentCard}>
          {post.isLoading && <PostDetailLoading />}
          {!post.isLoading && (
            <div className={styles.post}>
              <h2 className={styles.title}>{post?.data?.title}</h2>
              {user.isLoading && <PostUserLoading />}
              {!user.isLoading && (
                <div className={styles.author}>
                  <div className={styles.img}>
                    {(user?.data?.name.charAt(0) || "#")?.toUpperCase()}
                  </div>
                  <div className={styles.name}>
                    <p>Author</p>
                    <p>{user?.data?.name || "Anonymous"}</p>
                  </div>
                </div>
              )}
              <div className={styles.postBody}>
                <p>{post?.data?.body}</p>
              </div>
              {comments.isLoading && <PostCommetsLoading />}
              {!comments.isLoading && (
                <div className={styles.comments}>
                  <h2 className={styles.title}>
                    {`Comments ${
                      !!comments?.data?.length
                        ? `(${comments?.data?.length})`
                        : ""
                    }`}
                  </h2>
                  <div className={styles.commentContent}>
                    {!comments.data?.length && (
                      <div className={styles.noComment}>No comment..</div>
                    )}
                    {comments?.data?.map((comment) => (
                      <div key={comment.id} className={styles.commentItem}>
                        <div className={styles.commentUser}>
                          <div className={styles.commentImg}>
                            {comment.name.charAt(0)?.toUpperCase()}
                          </div>
                          <div className={styles.userInfo}>
                            <p>{comment.name}</p>
                            <p>{comment.email}</p>
                          </div>
                        </div>
                        <p className={styles.commentBody}>{comment.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DetailPostPage;

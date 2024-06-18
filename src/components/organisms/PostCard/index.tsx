import { useQueries } from "@tanstack/react-query";
import styles from "./PostCard.module.scss";
import { GetPost } from "@/utils/services/services.type";
import { FC } from "react";
import { getComments, getUser } from "@/utils/services";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import {
  PostCommentLoading,
  PostUserLoading,
} from "@/components/atoms/Loading/PostLoading";

type PostCardProps = {
  post: GetPost;
};

const PostCard: FC<PostCardProps> = (props) => {
  const { post } = props;
  const router = useRouter();

  const [user, comments] = useQueries({
    queries: [
      {
        queryKey: ["user", post.id],
        queryFn: () =>
          getUser({ variables: { userId: Number(post?.user_id) } }),
        enabled: !!post?.id,
      },
      {
        queryKey: ["comments", post.id],
        queryFn: () => getComments({ variables: { postId: Number(post?.id) } }),
        enabled: !!post?.id,
      },
    ],
  });

  const commentsLabel = (count: number) => {
    switch (count) {
      case 0:
        return "No comment";
      case 1:
        return `${count} comment`;
      default:
        return `${count} comments`;
    }
  };

  const gotoDetail = () => {
    const params = new URLSearchParams();
    params.set("postId", post.id.toString());
    router.push(`/post?${params.toString()}`);
  };

  return (
    <div className={styles.main}>
      <p className={styles.title}>{post.title}</p>
      {comments.isLoading && <PostCommentLoading />}
      {!comments.isLoading && (
        <div className={styles.comments}>
          {commentsLabel(comments.data?.length || 0)}
        </div>
      )}
      <div className={styles.body}>
        <p>{post.body}</p>
      </div>
      <div className={styles.detail}>
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
        <Button onClick={gotoDetail}>View Full Blog</Button>
      </div>
    </div>
  );
};

export default PostCard;

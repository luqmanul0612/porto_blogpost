import Shimmer from "../Shimmer";
import styles from "./PostLoading.module.scss";

export const PostCommentLoading = () => {
  return (
    <div className={styles.PostCommentLoading}>
      <Shimmer />
    </div>
  );
};

export const PostUserLoading = () => {
  return (
    <div className={styles.PostUserLoading}>
      <div>
        <Shimmer />
      </div>
      <div>
        <div>
          <Shimmer />
        </div>
        <div>
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

const PostLoading = () => {
  const items = Array.from({ length: 10 }, (_, idx) => idx + 1);
  return (
    <>
      {items.map((item) => (
        <div key={item} className={styles.PostLoading}>
          <div>
            <div>
              <Shimmer />
            </div>
            <div>
              <Shimmer />
            </div>
          </div>
          <PostCommentLoading />
          <div>
            <Shimmer />
          </div>
          <div>
            <PostUserLoading />
            <div>
              <Shimmer />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLoading;

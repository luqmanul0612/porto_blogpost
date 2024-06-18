import Shimmer from "../Shimmer";
import styles from "./PostDetailLoading.module.scss";
import { PostUserLoading } from "../PostLoading";
import PostCommetsLoading from "../PostCommetsLoading";

const PostDetailLoading = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <div>
          <Shimmer />
        </div>
        <div>
          <Shimmer />
        </div>
      </div>
      <PostUserLoading />
      <div className={styles.body}>
        <div>
          <Shimmer />
        </div>
        <div>
          <Shimmer />
        </div>
        <div>
          <Shimmer />
        </div>
        <div>
          <Shimmer />
        </div>
      </div>
      <div className={styles.comments}>
        <PostCommetsLoading />
      </div>
    </div>
  );
};

export default PostDetailLoading;

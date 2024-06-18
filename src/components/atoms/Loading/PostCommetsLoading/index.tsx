import Shimmer from "../Shimmer";
import styles from "./PostCommetsLoading.module.scss";
import { PostUserLoading } from "../PostLoading";

const PostCommetsLoading = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Shimmer />
      </div>
      <div className={styles.body}>
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

export default PostCommetsLoading;

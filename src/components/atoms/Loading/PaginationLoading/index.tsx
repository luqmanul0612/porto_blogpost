import Shimmer from "../Shimmer";
import styles from "./PaginationLoading.module.scss";

const PaginationLoading = () => {
  const pages = Array.from({ length: 8 }, (_, idx) => idx + 1);
  return (
    <div className={styles.main}>
      {pages.map((page) => (
        <div key={page} className={styles.paginationItem}>
          <Shimmer />
        </div>
      ))}
    </div>
  );
};

export default PaginationLoading;

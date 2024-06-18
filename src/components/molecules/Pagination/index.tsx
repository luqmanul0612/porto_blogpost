import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";
import PaginationLoading from "@/components/atoms/Loading/PaginationLoading";
import clsx from "clsx";
import Button from "@/components/atoms/Button";

type PaginationProps = {
  count: number;
  onChange: (page: number) => void;
  value: number;
  isLoading: boolean;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const pages = React.useMemo(() => {
    const pages = Array.from({ length: props.count }, (_, i) => i + 1);
    if (pages.length <= 5) {
      return {
        left: pages,
        right: [],
      };
    } else if (props.value < 6) {
      return {
        left: pages.slice(0, 6),
        right: [pages.length],
      };
    } else {
      const startFrom =
        props.value > 4
          ? props.value > pages.length - 5
            ? pages.length - 6
            : props.value - 2
          : 4;
      const endTo =
        props.value + 3 > pages.length ? pages.length : props.value + 3;
      const newPages = [...pages.slice(startFrom, endTo), pages.length];
      return {
        left: [1],
        right: newPages.filter((page, idx) => {
          return newPages.indexOf(page) === idx;
        }),
      };
    }
  }, [props.value, props.count]);

  return (
    <div className={styles.main}>
      {props.isLoading && <PaginationLoading />}
      {!props.isLoading && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={() => props.onChange(props.value - 1)}
            disabled={props.value - 1 < 1}
          >
            <ChevronLeft size={20} />
          </button>
          {pages.left.map((page) => (
            <button
              className={clsx(styles.paginationBtn, {
                [styles.active]: props.value === page,
              })}
              key={page}
              onClick={() => props.onChange(page)}
            >
              {page}
            </button>
          ))}
          {!!pages.right.length && <div className={styles.separator}>...</div>}
          {pages.right.map((page) => (
            <button
              className={clsx(styles.paginationBtn, {
                [styles.active]: props.value === page,
              })}
              key={page}
              onClick={() => props.onChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={styles.paginationBtn + " bg-blue-50 text-slate-600"}
            onClick={() => props.onChange(props.value + 1)}
            disabled={props.value + 1 > props.count}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;

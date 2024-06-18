"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./HomePage.module.scss";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/utils/services";
import PostCard from "@/components/organisms/PostCard";
import PostLoading from "@/components/atoms/Loading/PostLoading";
import Pagination from "@/components/molecules/Pagination";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setPage(queryPage ? Number(queryPage) : 1);
  }, [queryPage]);

  const posts = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts({ variables: { page, take: 20 } }),
  });

  useEffect(() => {
    if (posts.data) setCount(posts?.data?.numberOfPages ?? 0);
  }, [posts.data]);

  const onChangePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.pagination}>
          <Pagination
            value={page}
            onChange={(page) => onChangePage(page)}
            count={count}
            isLoading={posts.isLoading && !count}
          />
        </div>
        {posts.isLoading && (
          <div className={styles.cardWrapper}>
            <PostLoading />
          </div>
        )}
        {!posts.isLoading && (
          <div className={styles.cardWrapper}>
            {posts.data?.result?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        )}
        <div className={styles.pagination}>
          <Pagination
            value={page}
            onChange={(page) => onChangePage(page)}
            count={count}
            isLoading={posts.isLoading && !count}
          />
        </div>
      </div>
    </main>
  );
}

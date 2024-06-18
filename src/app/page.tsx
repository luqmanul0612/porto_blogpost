import HomePage from "@/containers/HomePage";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}

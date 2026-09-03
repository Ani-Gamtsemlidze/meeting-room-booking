import type { ReactNode } from "react";
import PageLoader from "./PageLoader";

type LoadingStateProps = {
  loading: boolean;
  children: ReactNode;
};

export default function LoadingState({ loading, children }: LoadingStateProps) {
  if (loading) {
    return <PageLoader />;
  }

  return children;
}

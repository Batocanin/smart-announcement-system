import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  nextCursor: string | null;
  isLoading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

const LoadMoreButton = ({ nextCursor, isLoading, onLoadMore, hasNextPage }: LoadMoreButtonProps) => {
  return (
    <Button
      onClick={onLoadMore}
      disabled={isLoading || !nextCursor || !hasNextPage}
      className="flex items-center gap-2"
      variant="outline"
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {hasNextPage && !isLoading ? "Load more" : "No more announcements"}
    </Button>
  );
};

export default LoadMoreButton;

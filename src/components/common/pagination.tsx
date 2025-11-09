import { useMemo, useCallback, memo } from 'react';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface PageConfig {
  showFirstEllipsis: boolean;
  showLastEllipsis: boolean;
  pages: number[];
}

const SMALL_PAGE_THRESHOLD = 7;

// Calculate which pages to display based on current page
const calculatePageConfig = (totalPages: number, currentPage: number): PageConfig => {
  if (totalPages <= SMALL_PAGE_THRESHOLD) {
    return {
      showFirstEllipsis: false,
      showLastEllipsis: false,
      pages: Array.from({ length: totalPages }, (_, i) => i + 1),
    };
  }

  // Fixed structure: [1, ellipsis?, page1, page2, page3, ellipsis?, last]
  // page2 is always the current page (in the middle)
  let page1: number;
  let page2: number;
  let page3: number;
  let showFirstEllipsis: boolean;
  let showLastEllipsis: boolean;

  if (currentPage === 1) {
    // Show: 1, 2, 3, 4, ..., last
    page1 = 2;
    page2 = 3;
    page3 = 4;
    showFirstEllipsis = false;
    showLastEllipsis = page3 + 1 < totalPages;
  } else if (currentPage === 2) {
    // Show: 1, 2, 3, 4, ..., last
    page1 = 1;
    page2 = 2; // Current page in middle
    page3 = 3; // Always show next page
    showFirstEllipsis = false;
    showLastEllipsis = page3 + 1 < totalPages;
  } else if (currentPage >= totalPages - 1) {
    // Show: 1, ..., last-2, last-1, last
    // Current page should be in middle slot
    if (currentPage === totalPages) {
      // When on last page, show: last-2, last-1, last
      // Put current page (last) in middle slot
      // Since we can't show next page, show previous pages in order
      page1 = totalPages - 2;
      page2 = totalPages - 1;
      page3 = totalPages; // Current page in last slot (will be shown as active)
    } else {
      // currentPage === totalPages - 1
      page1 = totalPages - 2;
      page2 = totalPages - 1; // Current page in middle
      page3 = totalPages; // Always show next page
    }
    showFirstEllipsis = true;
    showLastEllipsis = false;
  } else {
    // Normal case: current page in middle, always show next page
    // Show: 1, ..., current-1, current, current+1, ..., last
    page1 = currentPage - 1;
    page2 = currentPage; // Always current page in middle
    page3 = currentPage + 1; // Always show next page
    showFirstEllipsis = page1 - 1 > 1; // Only show if gap exists
    showLastEllipsis = page3 + 1 < totalPages; // Only show if gap exists
  }

  return {
    showFirstEllipsis,
    showLastEllipsis,
    pages: [page1, page2, page3],
  };
};

const PaginationComponentInternal = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    },
    [totalPages, currentPage, onPageChange],
  );

  const pageConfig = useMemo(
    () => calculatePageConfig(totalPages, currentPage),
    [totalPages, currentPage],
  );

  const handlePrevious = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handlePageChange(currentPage - 1);
    },
    [currentPage, handlePageChange],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handlePageChange(currentPage + 1);
    },
    [currentPage, handlePageChange],
  );

  const handlePageClick = useCallback(
    (page: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handlePageChange(page);
    },
    [handlePageChange],
  );

  const shouldShowFirstPage = totalPages > SMALL_PAGE_THRESHOLD ? pageConfig.pages[0] !== 1 : true;

  const shouldShowLastPage =
    totalPages > SMALL_PAGE_THRESHOLD ? !pageConfig.pages.includes(totalPages) : true;

  const isLargePageCount = totalPages > SMALL_PAGE_THRESHOLD;

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>

        {/* First page */}
        {shouldShowFirstPage && (
          <PaginationItem key="first">
            <PaginationLink isActive={1 === currentPage} onClick={handlePageClick(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* First ellipsis */}
        {isLargePageCount && pageConfig.showFirstEllipsis && (
          <PaginationItem key="ellipsis-first">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {isLargePageCount
          ? // Three fixed slots for large page counts
            pageConfig.pages
              .filter(page => {
                // Filter out duplicates: don't show page if it's already shown as first/last
                if (page === 1 && shouldShowFirstPage) return false;
                if (page === totalPages && shouldShowLastPage) return false;
                return true;
              })
              .map((page, index) => (
                <PaginationItem key={`page-${index + 1}`}>
                  <PaginationLink isActive={page === currentPage} onClick={handlePageClick(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
          : // All pages for small page counts
            pageConfig.pages
              .filter(page => page !== 1)
              .map(page => (
                <PaginationItem key={page}>
                  <PaginationLink isActive={page === currentPage} onClick={handlePageClick(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

        {/* Last ellipsis */}
        {isLargePageCount && pageConfig.showLastEllipsis && (
          <PaginationItem key="ellipsis-last">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page */}
        {totalPages > 1 && shouldShowLastPage && (
          <PaginationItem key="last">
            <PaginationLink
              isActive={totalPages === currentPage}
              onClick={handlePageClick(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
};

export const Pagination = memo(PaginationComponentInternal);

Pagination.displayName = 'Pagination';

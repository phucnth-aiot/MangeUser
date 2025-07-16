import { Meta } from "@/types/task";

interface PaginationProps {
  meta: Meta | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  meta,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (!meta || meta.totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(meta.totalPages, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-between mt-8 p-2.5">
      <span className="text-gray-600 text-sm">
        Showing {(currentPage - 1) * meta.itemsPerPage + 1} to{" "}
        {Math.min(currentPage * meta.itemsPerPage, meta.totalItems)} of{" "}
        {meta.totalItems} tasks
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        {start > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              1
            </button>
            {start > 2 && <span className="px-2 text-gray-500">…</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded border ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {end < meta.totalPages && (
          <>
            {end < meta.totalPages - 1 && (
              <span className="px-2 text-gray-500">…</span>
            )}
            <button
              onClick={() => onPageChange(meta.totalPages)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              {meta.totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === meta.totalPages}
          className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

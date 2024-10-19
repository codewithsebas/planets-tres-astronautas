import { PaginationProps } from "@/interfaces/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onPageChange,
    totalPages,
}) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 pe-4 flex items-center gap-2 text-black rounded-lg duration-200 hover:bg-slate-50 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <ChevronLeft /> Anterior
            </button>

            <span className="flex items-center p-1 px-3 h-fit border rounded-lg shadow-sm duration-200 hover:bg-slate-100">
                {currentPage}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={totalPages < currentPage}
                className={`p-2 ps-4 flex items-center gap-2 text-black rounded-lg duration-200 hover:bg-slate-50 ${totalPages < currentPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                Siguiente
                <ChevronRight />
            </button>
        </div>
    );
};

export default Pagination;

import { PaginationProps } from '@/interfaces/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 rounded-lg p-2 pe-4 duration-200 hover:bg-white/10 ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        <IoIosArrowBack /> Anterior
      </button>

      <span className="flex h-fit items-center rounded-lg border p-1 px-3 shadow-sm duration-200 hover:bg-white/10">
        {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={totalPages < currentPage}
        className={`flex items-center gap-2 rounded-lg p-2 ps-4 duration-200 hover:bg-white/10 ${
          totalPages < currentPage ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        Siguiente
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;

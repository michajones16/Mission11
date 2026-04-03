interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {
    return (
        <div className="flex items-center justify-center mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {/* Similar to saying "for (int index = 0; index < totalPages; index++)" in C# */}
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>

            <br />
            <label>
                Results per Page:
                <select
                    value={pageSize}
                    onChange={(page) => {
                        onPageSizeChange(Number(page.target.value))
                        onPageChange(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </div>
    )
}

export default Pagination;
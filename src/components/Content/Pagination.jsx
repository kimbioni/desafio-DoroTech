import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

  const safeCurrentPage = Math.max(1, Math.min(Number(currentPage) || 1, totalPages));

  return (
    <div className="paginationContainer">
      <MuiPagination
        count={totalPages}
        page={safeCurrentPage}  // Usa o valor seguro aqui
        onChange={(event, page) => setCurrentPage(page)}
        size="medium"
        variant="outlined"
        siblingCount={0}
        shape="rounded"
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "white",
            border: "1px solid var(--light-blue)",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "var(--light-blue)",
          },
        }}
      />
    </div>
  );
};

export default Pagination;

import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  

  return (
    <div className="paginationContainer">
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        size="large"
        variant="outlined"
        siblingCount={1}
        shape="rounded"
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "white", // Cor do texto
            border: "1px solid var(--light-blue)", // Borda dos botões
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "var(--light-blue)", // Cor do botão selecionado
          },

        }}
      />
    </div>
  );
};

export default Pagination;

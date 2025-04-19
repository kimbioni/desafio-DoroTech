import React from 'react'

import './Pagination.css'

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

  return (
    <div className='pagination'>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Próxima
      </button>
    </div>
  )
}

export default Pagination

import React from "react";

import "./FavoriteButton.css";

const FavoriteButton = ({ isFavorite, onToggle }) => {
  return (
    <>
      <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
        onClick={onToggle}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >{isFavorite ? '★' : '☆'}</button>
    </>
  );
};

export default FavoriteButton;

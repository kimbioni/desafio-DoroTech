import React from "react";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { IconButton } from "@mui/material";

import "./FavoriteButton.css";

const FavoriteButton = ({ isFavorite, onToggle }) => {
  return (
    <IconButton
      onClick={onToggle}
      aria-label={
        isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
      }
      color={isFavorite ? "var(--light-blue)" : "default"}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        "&:hover": {
          backgroundColor: "white",
        },
      }}
    >
      {isFavorite ? (
        <FavoriteTwoToneIcon sx={{ color: "var(--light-blue)" }} />
      ) : (
        <FavoriteBorderTwoToneIcon />
      )}
    </IconButton>
  );
};

export default FavoriteButton;

import React from "react";

import { Button } from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";

import Arrow_down from "../../assets/arrow_down2.png";

const FiltersSidebar = ({
  gender,
  setGender,
  status,
  setStatus,
  species,
  setSpecies,
  valueCards,
  setValueCards,
  showFavorites,
  setShowFavorites,
  filtersMobile,
  toggleFilters,
  applyFilters,
}) => {
  return (
    <>
      <div className="menuFilters_mob" onClick={toggleFilters}>
        <div className="menuFilters_mob-container">
          <h2>Filtros</h2>
          <button
            className="mobFilter_button"
            aria-expanded={filtersMobile}
            aria-controls="filtros-personagens"
          >
            <img
              className={`arrow-icon ${filtersMobile ? "rotated" : ""}`}
              src={Arrow_down}
              alt="Arrow"
            />
          </button>
        </div>
      </div>
      <aside
        id="filtros-personagens"
        className={`contentFilters ${filtersMobile ? "open" : "closed"}`}
        aria-label="Filtros de personagens"
      >
        <div className="filter-favorites">
          <Button
            
            variant="outlined" // ou "contained" se preferir
            startIcon={
              showFavorites ? (
                <FavoriteTwoToneIcon />
              ) : (
                <FavoriteBorderTwoToneIcon />
              )
            }
            onClick={() => {
              setShowFavorites(!showFavorites);
              applyFilters();
            }}
          >
            Favoritos
          </Button>
        </div>
        <div className="filter-section">
          <h2 className="filter-title" id="cards-label">
            Cards por página
          </h2>
          <div className="filter-options">
            <label className="filter-option filter-cards">
              <span className="sr-only">Quantidade de cards por página</span>
              <input
                type="range"
                name="cardsPage"
                min={5}
                max={20}
                step={5}
                value={valueCards}
                onChange={(e) => setValueCards(e.target.value)}
                aria-labelledby="cards-label"
                aria-valuetext={`${valueCards} cards`}
              />
              <span aria-live="polite">{valueCards}</span>
            </label>
          </div>
        </div>
        <div
          className="filter-section"
          role="group"
          aria-labelledby="gender-label"
        >
          <h2 className="filter-title" id="gender-label">
            Gênero
          </h2>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="All"
                checked={gender === "All"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              All
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Feminino
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Masculino
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="unknown"
                checked={gender === "unknown"}
                onChange={(e) => setGender(e.target.value)}
                aria-checked={gender === "Desconhecido"}
              />{" "}
              Desconhecido
            </label>
          </div>
        </div>
        <div
          className="filter-section"
          role="group"
          aria-labelledby="status-label"
        >
          <h2 className="filter-title" id="status-label">
            Status
          </h2>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="status"
                value="All"
                checked={status === "All"}
                onChange={(e) => setStatus(e.target.value)}
                aria-checked={status === "Todos"}
              />{" "}
              All
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="status"
                value="Alive"
                checked={status === "Alive"}
                onChange={(e) => setStatus(e.target.value)}
                aria-checked={status === "Vivo"}
              />{" "}
              Vivo
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="status"
                value="Dead"
                checked={status === "Dead"}
                onChange={(e) => setStatus(e.target.value)}
                aria-checked={status === "Morto"}
              />{" "}
              Morto
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="status"
                value="Unknown"
                checked={status === "Unknown"}
                onChange={(e) => setStatus(e.target.value)}
                aria-checked={status === "Desconhecido"}
              />{" "}
              Desconhecido
            </label>
          </div>
        </div>
        <div className="filter-section">
          <h2 className="filter-title" id="species-label">
            Species
          </h2>
          <select
            className="filter-select"
            aria-labelledby="species-label"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Alien">Alien</option>
            <option value="Animal">Animal</option>
            <option value="Cronenberg">Cronenberg</option>
            <option value="Disease">Disease</option>
            <option value="Human">Human</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Mythological Creature">Mythological Creature</option>
            <option value="Poopybutthole">Poopybutthole</option>
            <option value="Robot">Robot</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <button
          className="filter-button"
          onClick={(e) => {
            e.preventDefault();
            applyFilters();
            toggleFilters();
          }}
          aria-label="Aplicar Filtros"
        >
          Filtrar
        </button>
      </aside>
    </>
  );
};

export default FiltersSidebar;

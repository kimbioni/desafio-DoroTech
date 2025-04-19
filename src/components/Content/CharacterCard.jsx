import React from "react";
import FavoriteButton from "./FavoriteButton";

const CharacterCard = ({ char, isFavorite, onToggle }) => {
  return (
    <div
      className="card"
      key={char.id}
      role="listitem"
      aria-label={`Personagem ${char.name}`}
    >
      <img
        src={char.image}
        alt={char.name}
        aria-describedby={`desc-${char.id}`}
      />
      <h2>{char.name}</h2>
      <div className="characterInfo" id={`desc-${char.id}`}>
        <div className="characterGender">
          {char.gender === "Male" ? (
            <img
              src="https://cdn-icons-png.flaticon.com/128/3101/3101039.png"
              alt="Gênero masculino"
              aria-hidden="true"
            />
          ) : char.gender === "Female" ? (
            <img
              src="https://cdn-icons-png.flaticon.com/128/3877/3877811.png"
              alt="Gênero feminino"
              aria-hidden="true"
            ></img>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/11314/11314696.png"
              alt="Gênero desconhecido"
              aria-hidden="true"
            ></img>
          )}
          <span className="sr-only">{char.gender}</span>
        </div>
        <div className="characterSpecies">
          <p>{char.species}</p>
        </div>
        <div className="characterStatus">
          {char.status === "Alive" ? (
            <span className="status-alive" aria-label="Status: Vivo">
              ❤️
            </span>
          ) : char.status === "Dead" ? (
            <span className="status-dead" aria-label="Status: Morto">
              💀
            </span>
          ) : (
            <span className="status-unknown" aria-label="Status: Desconhecido">
              ❓
            </span>
          )}
        </div>
      </div>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={onToggle}
      />
    </div>
  );
};

export default CharacterCard;

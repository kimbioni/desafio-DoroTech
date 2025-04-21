import React from "react";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import "./CharacterCard.css";

const CharacterCard = ({ char, isFavorite, onToggle }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 'min(75%, 400px)',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(30px)',
    border: "2px solid var(--light-blue)",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div
        className="card"
        onClick={handleOpen}
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
              <span
                className="status-unknown"
                aria-label="Status: Desconhecido"
              >
                ❓
              </span>
            )}
          </div>
        </div>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={(e) => {
            e.stopPropagation(); //ao clicar em favoritos evita que o modal abra
            onToggle();
          }}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            },
          },
        }}
      >
        <Box className="modalCard" sx={modalStyle}>
          <img src={char.image} alt={char.name} />
          <div id="modal-description" sx={{ mt: 2 }}>
            <h2 id="modal-title">{char.name}</h2>
            <div className="modalInfo_content">
              <p>
                GÊNERO:{" "}
                <span>
                  {char.gender === "Male"
                    ? "Masculino"
                    : char.gender === "Female"
                    ? "Feminino"
                    : char.gender === "unknown"
                    ? "Desconhecido"
                    : "outro"}
                </span>
              </p>

              <p>
                STATUS: <span>{char.status}</span>
              </p>

              <p>
                ESPÉCIE: <span>{char.species}</span>{" "}
              </p>

              <p>
                ORIGEM: <span>{char.origin.name}</span>
              </p>

              <p>
                LOCALIZAÇÃO: <span>{char.location.name}</span>
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CharacterCard;

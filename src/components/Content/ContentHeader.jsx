import React from 'react'
import { Link } from "react-router-dom";

import RickandMorty_logo from "../../assets/rickandmorty_logo.png";
import RickandMorty_png from "../../assets/rickandmorty_png.png";

const ContentHeader = ({ searchChar, setSearchChar, handleSearch }) => {
  return (
    <header>
            <img
              className="imageHeader"
              src={RickandMorty_png}
              alt="Personagens Rick and Morty decorativos"
            />
            <img
              className="imageHeader2"
              src={RickandMorty_png}
              alt="Personagens Rick and Morty decorativos"
            />
            <Link to="/" aria-label="Voltar para página inicial">
              <img
                className="contentLogo"
                src={RickandMorty_logo}
                alt="Logo Rick and Morty"
              />
            </Link>
            <h1 id="main-heading">
              mergulhe no multiverso de Rick and Morty, veja os personagens e
              curiosidades
            </h1>
            <form className="contentSearch" role="search" onSubmit={handleSearch}>
              <label htmlFor="search-input" className="sr-only">
                Buscar Personagem
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Buscar personagem..."
                aria-label="Buscar Personagem"
                value={searchChar}
                onChange={(e) => setSearchChar(e.target.value)}
              />
              <button type="submit" aria-label="Executar busca">
                Buscar
              </button>
            </form>
          </header>
  )
}

export default ContentHeader

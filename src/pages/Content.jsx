import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import RickandMorty_logo from "../assets/rickandmorty_logo.png";
import RickandMorty_png from "../assets/rickandmorty_png.png";

import "./Content.css";

const Content = () => {
  //estado inicial de characters um array vazio e espera-se receber os dados da api
  const [characters, setCharacters] = useState([]);
  //loading enquanto aguarda o request, setado inicialmente como true
  const [loading, setLoading] = useState(true);
  //estado inicial do value do selector de cards por página
  const [valueCards, setValueCards] = useState(0);
  //estado inicial do value do selector de Gênero
  const [gender, setGender] = useState("All");
  //estado inicial do value do selector de Status
  const [status, setStatus] = useState("All");
  //estado inicial do value do selector de Espécies
  const [species, setSpecies] = useState("All");

  //estado para armazenar os personagens filtrados
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        //faz a requisição para API
        const response = await fetch(
          "https://rickandmortyapi.com/api/character/"
        );
        //os dados são convertidos para Json
        const data = await response.json();
        //Preenche o array vazio de characters com os dados da API (em formato json)
        setCharacters(data.results);
        setFilteredCharacters(data.results);
        //Assim que preenchido os characters, loading é removido
        setLoading(false);
      } catch (error) {
        //Mensagem de erro caso o consumo da API não seja possível
        console.log("Erro ao buscar personagens:", error);
        //Nesse caso loading é desligado para não ficar rodando infinitamente
        setLoading(false);
      }
    };

    //Chama a função que busca os dados dos personagens
    fetchCharacters();
  }, []);

  //Função para aplicar o filtro
  const applyFilters = () => {
    let result = characters;

    if (gender !== "All") {
      result = result.filter((char) => char.gender === gender);
    }

    if (status !== "All") {
      result = result.filter((char) => char.status === status);
    }

    if (species !== "All") {
      result = result.filter((char) => char.species === status);
    }

    if (valueCards > 0) {
      result = result.slice(0, valueCards);
    }

    setFilteredCharacters(result);
  };

  //Mensagem de loading enquanto API é solicitada
  if (loading) return <p>Carregando personagens...</p>;

  return (
    <div className="container">
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
        <div className="contentSearch" role="search">
          <label htmlFor="search-input" className="sr-only">
            Buscar Personagem
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Buscar personagem..."
            aria-label="Buscar Personagem"
          />
          <button aria-label="Executar busca">Buscar</button>
        </div>
      </header>

      <div className="container_content">
        <aside className="contentFilters" aria-label="Filtros de personagens">
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
                  min={0}
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
                  aria-checked={gender === "Todos"}
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
                  aria-checked={gender === "Feminino"}
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
                  aria-checked={gender === "Masculino"}
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
              <option value="Mythological Creature">
                Mythological Creature
              </option>
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Robot">Robot</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <button
            className="filter-button"
            onClick={applyFilters}
            aria-label="Aplicar Filtros"
          >
            Filtrar
          </button>
        </aside>
        <div className="cards">
          <div className="container_card">
            {filteredCharacters.map((char) => (
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
                      <span className="status-alive" aria-label="Status: Vivo">❤️</span>
                    ) : char.status === "Dead" ? (
                      <span className="status-dead" aria-label="Status: Morto">💀</span>
                    ) : (
                      <span className="status-unknown" aria-label="Status: Desconhecido">❓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

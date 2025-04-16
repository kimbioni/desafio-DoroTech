import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import RickandMorty_logo from "../assets/rickandmorty_logo.png";

import "./Content.css";

const Content = () => {
  //estado inicial de characters um array vazio e espera-se receber os dados da api
  const [characters, setCharacters] = useState([]);
  //loading enquanto aguarda o request, setado inicialmente como true
  const [loading, setLoading] = useState(true);

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

  //Mensagem de loading enquanto API é solicitada
  if (loading) return <p>Carregando personagens...</p>;

  return (
    <div className="container">
      <header>
        <nav>
          <Link to="/">
            <img src={RickandMorty_logo} alt="" />
          </Link>
        </nav>
        <h1>
          mergulhe no multiverso de Rick and Morty, veja os personagens e
          curiosidades
        </h1>
      </header>

      <div className="container_content">
        <aside>
          <div>
            <legend>Gender</legend>
            <label>
              <input type="radio" name="gender" value="All" checked /> All
            </label>
            <label>
              <input type="radio" name="gender" value="Female" /> Female
            </label>
            <label>
              <input type="radio" name="gender" value="Genderless" /> Genderless
            </label>
            <label>
              <input type="radio" name="gender" value="Male" /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="unknown" /> Unknown
            </label>
          </div>
          <div>
            <legend>Status</legend>
            <label>
              <input type="radio" name="status" value="All" checked /> All
            </label>
            <label>
              <input type="radio" name="status" value="Alive" /> Alive
            </label>
            <label>
              <input type="radio" name="status" value="Dead" /> Dead
            </label>
            <label>
              <input type="radio" name="status" value="unknown" /> Unknown
            </label>
          </div>
          <div class="language-selector">
            <legend>Species</legend>
            <select aria-label="language-selector" class="modern-select">
              <option value="All" selected>
                All
              </option>
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
        </aside>
        <div className="cards">
          <div className="container_card">
            {characters.map((char) => (
              <div className="card" key={char.id}>
                <img src={char.image} alt={char.name} />
                <h2>{char.name}</h2>
                <div className="characterInfo">
                  <div className="characterGender">
                    {char.gender === "Male" ? (
                      <img src="https://cdn-icons-png.flaticon.com/128/3101/3101039.png" />
                    ) : char.gender === "Female" ? (
                      <img src="https://cdn-icons-png.flaticon.com/128/3877/3877811.png"></img>
                    ) : (
                      <img src="https://cdn-icons-png.flaticon.com/128/11314/11314696.png"></img>
                    )}
                  </div>
                  <div className="characterSpecies">
                    <p>{char.species}</p>
                  </div>
                  <div className="characterStatus">
                    {char.status === "Alive" ? (
                      <span className="status-alive">❤️</span>
                    ) : char.status === "Dead" ? (
                      <span className="status-dead">💀</span>
                    ) : (
                      <span className="status-unknown">❓</span>
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

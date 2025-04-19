import React, { useEffect, useState } from "react";

import "./Content.css";
import ContentHeader from "../components/Content/ContentHeader";
import FiltersSidebar from "../components/Content/FiltersSidebar";
import CharactersGrid from "../components/Content/CharactersGrid";
import Pagination from "../components/Content/Pagination";

const Content = () => {
  //estado inicial de characters um array vazio e espera-se receber os dados da api
  const [characters, setCharacters] = useState([]);

  //loading enquanto aguarda o request, setado inicialmente como true
  const [loading, setLoading] = useState(true);

  //estado inicial do value do selector de cards por página (inicia mostrando 20 cards)
  const [valueCards, setValueCards] = useState(20);

  //estado inicial do value do selector de Gênero
  const [gender, setGender] = useState("All");
  //estado inicial do value do selector de Status
  const [status, setStatus] = useState("All");
  //estado inicial do value do selector de Espécies
  const [species, setSpecies] = useState("All");

  //estado para armazenar os personagens filtrados
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  //estado para o campo de busca
  const [searchChar, setSearchChar] = useState("");

  //estado para o favorites (um para aplicar como favorito e outro para mostrar os favoritos)
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  //aplicação de classes para mostrar/ocultar o filtro mobile
  const [filtersMobile, setFiltersMobile] = useState(false);

  //estado para carregar e definir o número total de páginas disponíveis na API
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //useEffect para armazenar os favoritos no localStorage, fazendo com que o usuário atualize a página e a condição de favorito se mantenha
  useEffect(() => {
    const savedFavorites = localStorage.getItem("rickAndMortyFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  //function para alternar a visibilidade/estilo dos filtros na versão mobile
  const toggleFilters = () => {
    setFiltersMobile(!filtersMobile);
  };

  //Função principal de acesso à API rick and morty
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        //faz a requisição para API
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${currentPage}`
        );
        //os dados são convertidos para Json
        const data = await response.json();
        //Preenche o array vazio de characters com os dados da API (em formato json)
        setCharacters(data.results);
        setFilteredCharacters(data.results);
        //Total de páginas disponíveis na API
        setTotalPages(data.info.pages)
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
  }, [currentPage]);

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

  // Efeito para aplicar filtros com debounce (evita muitas execuções)
  useEffect(() => {
    if (characters.length === 0) return;

    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(debounceTimer); // Limpa o timer se o estado mudar antes do timeout
  }, [searchChar, favorites, showFavorites, valueCards]);

  //Função principal para aplicar os filtros
  const applyFilters = () => {
    let result = [...characters]; //Estado inicial mostrando todos os personagens

    //Filtro de favoritos
    if (showFavorites) {
      result = result.filter((char) => favorites.includes(char.id));
    }

    //Filtro de busca por nome
    if (searchChar) {
      result = result.filter((char) =>
        char.name.toLowerCase().includes(searchChar.toLowerCase())
      );
    }

    //Filtro de gênero
    if (gender !== "All") {
      result = result.filter((char) => char.gender === gender);
    }

    //Filtro de status
    if (status !== "All") {
      result = result.filter((char) => char.status === status);
    }

    //Filtro de espécies
    if (species !== "All") {
      result = result.filter((char) => char.species === species);
    }

    //Limita a quantidade de cards exibidos
    if (valueCards > 0) {
      result = result.slice(0, valueCards);
    }

    setFilteredCharacters(result);
  };

  //Função para adicionar/remover o estado de favorito de um personagem
  const toggleFavorite = (characterId) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId) //Aqui é feito a remoção caso já esteja favoritado
        : [...prev, characterId]; //Aqui adiciona ao array junto dos outros (quando recebe estado de favorito)

      //Salva no localStorage
      localStorage.setItem(
        "rickAndMortyFavorites",
        JSON.stringify(newFavorites)
      );
      return newFavorites;
    });
    //Reaplica os filtros após a mudança
    applyFilters();
  };

  //Handler para o submit do formulário de busca
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  //Mensagem de loading enquanto API é solicitada
  if (loading) return <p>Carregando personagens...</p>;

  return (
    <div className="container">
      <ContentHeader
        searchChar={searchChar}
        setSearchChar={setSearchChar}
        handleSearch={handleSearch}
      />

      <div className="container_content">
        <FiltersSidebar
          gender={gender}
          setGender={setGender}
          status={status}
          setStatus={setStatus}
          species={species}
          setSpecies={setSpecies}
          valueCards={valueCards}
          setValueCards={setValueCards}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          filtersMobile={filtersMobile}
          toggleFilters={toggleFilters}
          applyFilters={applyFilters}
        />
        <CharactersGrid
          filteredCharacters={filteredCharacters}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Content;

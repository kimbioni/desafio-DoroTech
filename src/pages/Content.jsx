import React, { useEffect, useState } from "react";

import "./Content.css";
import ContentHeader from "../components/Content/ContentHeader";
import FiltersSidebar from "../components/Content/FiltersSidebar";
import CharactersGrid from "../components/Content/CharactersGrid";
import Pagination from "../components/Content/Pagination";

const Content = () => {
  //Estado para armazenar todos os personagens retornados pela API
  const [characters, setCharacters] = useState([]);

  //Estado que indica se os dados ainda estão sendo carregados
  const [loading, setLoading] = useState(true);

  //Estado que define quantos cards serão exibidos (0 = todos)
  const [valueCards, setValueCards] = useState(0);

  //estado inicial do value do selector de Gênero
  const [gender, setGender] = useState("All");
  //estado inicial do value do selector de Status
  const [status, setStatus] = useState("All");
  //estado inicial do value do selector de Espécies
  const [species, setSpecies] = useState("All");

  //estado para armazenar os personagens filtrados
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  //estado para o campo de busca por nome
  const [searchChar, setSearchChar] = useState("");

  //estado para armazenar o IDs dos personagens favoritos
  const [favorites, setFavorites] = useState([]);

  //estado para armazenar os dados completos dos personagens favoritos
  const [favoritesData, setFavoritesData] = useState([]);

  //booleano para indicar se o usuário está visualizando os favoritos
  const [showFavorites, setShowFavorites] = useState(false);

  //aplicação de classes para mostrar/ocultar o filtro mobile
  const [filtersMobile, setFiltersMobile] = useState(false);

  //estado para carregar e definir o número total de páginas disponíveis na API + paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //useEffect para armazenar os favoritos no localStorage, fazendo com que o usuário atualize a página e a condição de favorito se mantenha
  useEffect(() => {
    const savedFavorites = localStorage.getItem("rickAndMortyFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Efeito para buscar dados completos dos favoritos quando a lista de favoritos mudar
  useEffect(() => {
    const fetchFavoriteCharacters = async () => {
      if (favorites.length === 0) {
        setFavoritesData([]);
        return;
      }

      try {
        // Garante que todos os IDs sejam válidos antes da requisição
        const validFavorites = favorites.filter(
          (id) => typeof id === "number" || !isNaN(Number(id))
        );
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${validFavorites.join(
            ","
          )}`
        );

        const favCharacters = await response.json();
        // A API retorna um array quando há múltiplos IDs, ou um objeto quando há apenas um
        setFavoritesData(
          Array.isArray(favCharacters) ? favCharacters : [favCharacters]
        );
      } catch (error) {
        console.log("Erro ao buscar personagens favoritos:", error);
      }
    };

    fetchFavoriteCharacters();
  }, [favorites]);

  //function para alternar a visibilidade/estilo dos filtros na versão mobile
  const toggleFilters = () => {
    setFiltersMobile(!filtersMobile);
  };

  //Função principal de acesso à API rick and morty, executada ao mudar de página
  useEffect(() => {
    if (showFavorites) {
      applyFilters();
      return;
    }
    const fetchCharacters = async () => {
      try {
        setLoading(true);

        // Constrói a query string dinamicamente
        const params = new URLSearchParams({
          page: currentPage,
          ...(searchChar && { name: searchChar }),
          ...(status !== "All" && { status }),
          ...(species !== "All" && { species }),
          ...(gender !== "All" && { gender }),
        });

        const response = await fetch(
          `https://rickandmortyapi.com/api/character?${params.toString()}`
        );
        const data = await response.json();

        setCharacters(data.results);
        setTotalPages(data.info.pages);

        // Aplica limite de cards imediatamente
        const limitedResults =
          valueCards > 0 ? data.results.slice(0, valueCards) : data.results;

        setFilteredCharacters(limitedResults);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar personagens:", error);
        setLoading(false);
      }
    };   

    const debounceTimer = setTimeout(() => {
      fetchCharacters();
    }, 500);
    
    return () => clearTimeout(debounceTimer)
  }, [currentPage, searchChar, valueCards]);

  //Sempre que os personagens mudarem, sincroniza com os filtrados
  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

  // Efeito para aplicar filtros com debounce (evita muitas execuções)
  useEffect(() => {
    if (characters.length === 0) return;

    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(debounceTimer); // Limpa o timer se o estado mudar antes do timeout
  }, [
    //filtros que são executados sem a necessidade de clicar em "filtrar"
    searchChar,
    showFavorites,
    valueCards,
    favorites,
    favoritesData,
  ]);

  //Função principal para aplicar os filtros
  const applyFilters = () => {
    let result = showFavorites ? [...favoritesData] : [...characters];

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
  const toggleFavorite = (character) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.includes(character.id);

      const newFavorites = isAlreadyFavorite
        ? favorites.filter((id) => id !== character.id) //Aqui é feito a remoção caso já esteja favoritado
        : [...prev, character.id]; //Aqui adiciona ao array junto dos outros (quando recebe estado de favorito)

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
      {!showFavorites && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Content;

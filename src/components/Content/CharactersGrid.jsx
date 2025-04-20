import React from 'react'
import CharacterCard from './CharacterCard'

const CharactersGrid = ({ filteredCharacters, favorites, toggleFavorite }) => {
  return (
      <div className="cards">
          <div className="container_card" role="list">
            {filteredCharacters.map((char) => (
              <CharacterCard key={char.id}
              char={char}
              isFavorite={favorites.includes(char.id)}
              onToggle={() => toggleFavorite(char)} />
            ))}
          </div>
        </div>
  )
}

export default CharactersGrid

import React from 'react'
import ContinueButton from './ContinueButton'
import RickandMorty_logo from '../../assets/rickandmorty_logo.png'
import StarField from './StarField'

const HomeContent = ({content}) => {
  return (
    <section
        //Se "showContent" for true, aplica uma nova classe (para mostrar o conteúdo) à essa div
        className={`homepage_content ${content ? "content-show" : ""}`}
        aria-label="Introdução Rick and Morty"
      >
        <div className="bg" aria-hidden="true"></div>
        <StarField />
        <div className="homepage_content-container">
          <img src={RickandMorty_logo} alt="Logo da série Rick and Morty" className="shake" />
          <p className="line-1 shake" aria-live="polite" id="description">
            Embarque nessa aventura alucinante com Rick e Morty! Clique em
            'Continuar' para descobrir curiosidades, explorar personagens,
            locais e episódios dessa série incrível.
          </p>
          <ContinueButton />
        </div>
      </section>
  )
}

export default HomeContent

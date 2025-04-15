import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RickandMorty from "../assets/rick&morty.gif";
import RickandMorty_logo from "../assets/rickandmorty_logo.png";
import "./Home.css";

const Home = () => {
  //useState para controlar o estado inicial e final do conteúdo
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    //timer1 é para controlar o estado de true para "showContent" (0,4 segundos)
    const timer1 = setTimeout(() => setShowContent(true), 400);

    return () => {
      //return para limpar o timer e evitar que o efeito aconteça mais de uma vez
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="homepage_container">
      <div
        className="homepage_img"
        style={{ backgroundImage: `url(${RickandMorty})` }}
      ></div>
      <div
        //Se "showContent" for true, aplica uma nova classe (para mostrar o conteúdo) à essa div
        className={`homepage_content ${showContent ? "content-show" : ""}`}
      >
        <div className="bg"></div>
        <div className="star-field">
          <div className="layer"></div>
          <div className="layer"></div>
          <div className="layer"></div>
        </div>
        <div className="homepage_content-container">
          <img src={RickandMorty_logo} alt="Rick and Morty" className="shake" />
          <p className="line-1 shake anim-typewriter">
            Embarque nessa aventura alucinante com Rick e Morty! Clique em
            'Continuar' para descobrir curiosidades, explorar personagens,
            locais e episódios dessa série incrível.
          </p>
          <Link to="/content" className=" animated-button shake">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arr-2"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">CONTINUAR</span>
            <span className="circle"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="arr-1"
              viewBox="0 0 24 24"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

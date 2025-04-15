import React, { useState, useEffect } from "react";
import RickandMorty from "../assets/rickandmorty_upscaled.gif";
import BackgroundImage from "../components/Home/BackgroundImage";
import HomeContent from "../components/Home/HomeContent";

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
    <main className="homepage_container">
      <BackgroundImage background={RickandMorty} />
      <HomeContent content={showContent} />
    </main>
  );
};

export default Home;

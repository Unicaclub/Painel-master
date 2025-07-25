import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div style={{padding:40,textAlign:"center"}}>
      <h1>ÚNICA CLUB - Venda de Convites</h1>
      <p>Escolha seu evento e compre seu ingresso</p>
      <Link to="/checkout"><button>Comprar Agora</button></Link>
    </div>
  );
}

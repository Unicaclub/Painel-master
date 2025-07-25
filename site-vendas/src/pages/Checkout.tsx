import React, { useState } from "react";
export default function Checkout() {
  const [nome, setNome] = useState(""); const [cpf, setCpf] = useState(""); const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  async function comprar() {
    setStatus("Processando..."); setTimeout(()=>setStatus("Compra aprovada! QR enviado no WhatsApp!"),2000);
  }
  return (
    <div style={{padding:40}}>
      <h2>Checkout</h2>
      <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}/><br/>
      <input placeholder="CPF" value={cpf} onChange={e=>setCpf(e.target.value)}/><br/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
      <button onClick={comprar}>Finalizar Compra</button>
      <p>{status}</p>
    </div>
  );
}

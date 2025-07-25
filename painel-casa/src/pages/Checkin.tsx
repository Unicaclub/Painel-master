import React, { useState } from "react";
export default function Checkin() {
  const [cpf, setCpf] = useState(""); const [status, setStatus] = useState("");
  async function checkin() {
    setStatus("Buscando..."); setTimeout(()=>setStatus("Cliente OK! Entrada liberada."),2000);
  }
  return (
    <div style={{padding:40}}>
      <h2>Check-in de Cliente</h2>
      <input placeholder="CPF" value={cpf} onChange={e=>setCpf(e.target.value)}/><br/>
      <button onClick={checkin}>Validar Entrada</button>
      <p>{status}</p>
    </div>
  );
}

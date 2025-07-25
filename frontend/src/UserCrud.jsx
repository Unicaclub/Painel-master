import React, { useEffect, useState } from "react";
import axios from "axios";
export default function UserCrud() {
  const [users, setUsers] = useState([]), [nome, setNome] = useState(""), [email, setEmail] = useState(""), [senha, setSenha] = useState("");
  useEffect(() => { axios.get("http://localhost:3001/api/users").then(r => setUsers(r.data)); }, []);
  const addUser = async () => { await axios.post("http://localhost:3001/api/users", { nome, email, senha }); window.location.reload(); };
  const delUser = async id => { await axios.delete(`http://localhost:3001/api/users/${id}`); window.location.reload(); };
  return (<div style={{padding:32}}><h2>Usuários</h2><ul>{users.map(u=>(<li key={u.id}>{u.nome} ({u.email}) <button onClick={()=>delUser(u.id)}>remover</button></li>))}</ul>
  <h3>Adicionar</h3>
  <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}/>
  <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
  <input placeholder="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)}/>
  <button onClick={addUser}>Salvar</button></div>);
}

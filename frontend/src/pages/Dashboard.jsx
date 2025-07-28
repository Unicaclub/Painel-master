import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState("")
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }
    fetchUsers()
  }, [navigate])

  const fetchUsers = async () => {
    const res = await fetch("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.status === 401) return navigate("/")
    const data = await res.json()
    setUsers(data)
  }

  const handleCreate = async () => {
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password: "123456" }),
    })
    setEmail("")
    fetchUsers()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchUsers()
  }

  const handleEdit = async (id, newEmail) => {
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email: newEmail }),
    })
    setEditingId(null)
    fetchUsers()
  }

  return (
    <div>
      <h1>📊 Painel Admin</h1>
      <a href="/logout">Logout</a>

      <h3>Criar novo usuário</h3>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={handleCreate}>Criar</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingId === user.id ? (
                  <input
                    defaultValue={user.email}
                    onBlur={(e) => handleEdit(user.id, e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                <button onClick={() => setEditingId(user.id)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Dashboard

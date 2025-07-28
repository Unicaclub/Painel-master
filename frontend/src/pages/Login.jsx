import { useState } from 'react'
function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const handleSubmit = async () => {
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(form) })
    const data = await res.json()
    localStorage.setItem('token', data.token)
  }
  return <form onSubmit={handleSubmit}>...</form>
}
export default Login

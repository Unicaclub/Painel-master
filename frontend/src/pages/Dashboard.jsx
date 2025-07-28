import { useEffect, useState } from 'react'

function Dashboard() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMessage(JSON.stringify(data)))
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{message}</pre>
    </div>
  )
}

export default Dashboard

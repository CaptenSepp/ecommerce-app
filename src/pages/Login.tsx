import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simuliertes Login – in echten Projekten via API und Token
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('token', 'mock-jwt')
      navigate('/')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <main className="container section max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block font-medium text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Sign in
        </button>
      </form>
    </main>
  )
}

export default Login

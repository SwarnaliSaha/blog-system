import React, { useState } from 'react'
import { login } from '../api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await login({ email, password })
      setMessage({ type: 'success', text: (res?.message || 'Logged in') })
    }catch(err){
      setMessage({ type: 'error', text: err?.message || 'Login failed' })
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      {message && <div className={`msg ${message.type}`}>{message.text}</div>}
      <form onSubmit={submit} className="auth-form">
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <div className="form-actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

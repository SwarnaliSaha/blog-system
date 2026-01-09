import React, { useState } from 'react'
import { register } from '../api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await register({ name, email, password })
      setMessage({ type: 'success', text: (res?.message || 'Registered') })
    }catch(err){
      setMessage({ type: 'error', text: err?.message || 'Registration failed' })
    }
  }

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      {message && <div className={`msg ${message.type}`}>{message.text}</div>}
      <form onSubmit={submit} className="auth-form">
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <div className="form-actions">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './index.css'

function App(){
  return (
    <div className="app-root">
      <header className="topbar">
        <div className="container">
          <Link to="/" className="brand">MinimalBlog</Link>
          <div className="search">
            <input placeholder="Search posts, authors, tags..." />
          </div>
          <nav className="topnav">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="hero">
          <div className="left">
            <h1>Thoughtful writing. Beautifully simple.</h1>
            <p>Discover curated posts, follow authors you love, and join the conversation.</p>
            <Link className="cta" to="/register">Get started</Link>
          </div>
          <div className="right">
            <h3>Featured</h3>
            <p className="muted">Get tips for writing, building, and launching your ideas.</p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} MinimalBlog</div>
      </footer>
    </div>
  )
}

export default App

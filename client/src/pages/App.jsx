import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="container">
      <header className="nav">
        <div className="brand">
          <span className="brand-badge" />
          Contact Manager
        </div>
        <nav className="toolbar">
          <Link className="btn secondary" to="/">Contacts</Link>
        </nav>
      </header>
      <div style={{ height: 16 }} />
      <Outlet />
    </div>
  )
}



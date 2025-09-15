import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })

  const fetchContacts = async () => {
    const res = await fetch(`${API_BASE}/api/contacts?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setContacts(data)
  }

  useEffect(() => {
    fetchContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const onSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${API_BASE}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ name: '', email: '', phone: '', notes: '' })
    fetchContacts()
  }

  const filtered = useMemo(() => contacts, [contacts])

  return (
    <div className="stack">
      <section className="panel toolbar">
        <div className="search" style={{ flex: 1 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/></svg>
          <input placeholder="Search name, email, phone..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </section>

      <section className="grid">
        <form onSubmit={onSubmit} className="panel stack">
          <h3>Add Contact</h3>
          <input className="input" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea className="textarea" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button className="btn" type="submit">Save</button>
        </form>

        <div className="panel">
          <div className="toolbar"><h3 style={{ margin: 0 }}>Contacts</h3><div className="spacer" /></div>
          <ul className="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filtered.map((c) => (
              <li key={c._id} className="card">
                <div>
                  <div className="title">{c.name}</div>
                  <div className="muted">{c.email}</div>
                  <div className="muted">{c.phone}</div>
                </div>
                <div className="toolbar">
                  <Link className="btn secondary" to={`/contacts/${c._id}`}>Edit</Link>
                  <button
                    className="btn danger"
                    onClick={async () => {
                      await fetch(`${API_BASE}/api/contacts/${c._id}`, { method: 'DELETE' })
                      fetchContacts()
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}



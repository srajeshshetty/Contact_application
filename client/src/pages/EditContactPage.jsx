import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function EditContactPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${API_BASE}/api/contacts/${id}`)
      const data = await res.json()
      setForm({ name: data.name, email: data.email, phone: data.phone, notes: data.notes || '' })
    })()
  }, [id])

  const onSubmit = async (e) => {
    e.preventDefault()
    await fetch(`${API_BASE}/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit} className="panel stack">
      <h3>Edit Contact</h3>
      <input className="input" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="input" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <textarea className="textarea" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <div className="toolbar">
        <button className="btn" type="submit">Update</button>
        <button className="btn secondary" type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  )
}



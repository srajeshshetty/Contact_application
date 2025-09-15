const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all with optional search query
router.get('/', async (req, res) => {
  const { q } = req.query;
  const filter = q
    ? { $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } }
      ] }
    : {};
  try {
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;



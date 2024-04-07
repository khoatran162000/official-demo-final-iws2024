// routes/event.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /events: Lấy tất cả events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /events: Tạo một event mới
router.post('/', async (req, res) => {
  try {
    const { title, description, location, date, time } = req.body;
    const event = await Event.create({
      title,
      description,
      location,
      date,
      time,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// GET /events/:id: Lấy một event cụ thể bằng ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /events/:id: Cập nhật một event cụ thể bằng ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, location, date, time } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      title,
      description,
      location,
      date,
      time,
    }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({error: 'Invalid data' });
  }
});

// DELETE /events/:id: Xóa một event cụ thể bằng ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
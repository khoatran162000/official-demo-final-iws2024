const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get All Todos
// http://localhost:5000/todos/
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Todo by Id
// http://localhost:5000/todos/:id
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo Not Found!!!"});
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create New Todo
// http://localhost:5000/todos/
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a Todo by Id
// http://localhost:5000/todos/:id
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        if (!todo) {
            return res.status(404).json("Todo Not Found!!!");
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a Todo by Id
// http://localhost:5000/todos/:id
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            res.status(400).json("Todo Not Found!!!");
        }
        res.status(204).json("Todo Deleted!!!");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
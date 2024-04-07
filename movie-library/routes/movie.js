const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get All Movies
// http://localhost:5000/movies/
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        json.status(500).json(err);
    }
});

// Get a Movie by Id
// http://localhost:5000/movies/:id
router('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json("Movie not found!!!");
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create New Movie
// http://localhost:5000/movies/
router.post("/", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a Movie by Id
// http://localhost:5000/movies/:id
router.put('/:id', async (req, res) =>{
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        if (!movie) {
            return res.status(404).json("Movie Not Found!!!");
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a Movie by Id
// http://localhost:5000/movies/:id
router.delete('/:id', async (req,res)=> {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if(!movie) {
            return res.status(404).json("Movie Not Found!!!");
        }
        res.status(204).json("Movie Deleted Successfully!!!");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
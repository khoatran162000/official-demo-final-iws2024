// routes/recipe.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recipe = require('../models/Recipe');

// GET /recipes: Lấy tất cả recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /recipes: Tạo một recipe mới
router.post('/', multer().single('image'), async (req, res) => {
  try {
    const { title, ingredients, instructions, cookingTime, difficultyLevel, category } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      difficultyLevel,
      category,
      imageUrl,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// GET /recipes/:id: Lấy một recipe cụ thể bằng ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /recipes/:id: Cập nhật một recipe cụ thể bằng ID
router.put('/:id', multer().single('image'), async (req, res) => {
  try {
    const { title, ingredients, instructions, cookingTime, difficultyLevel, category } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
      title,
      ingredients,
      instructions,
      cookingTime,
      difficultyLevel,
      category,
      imageUrl,
    }, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE /recipes/:id: Xóa một recipe cụ thể bằng ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
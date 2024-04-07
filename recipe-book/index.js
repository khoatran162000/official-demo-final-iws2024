// index.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const recipeRoutes = require('./routes/recipe');

const app = express();
const port = 3000;

// Kết nối tới cơ sở dữ liệu MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Sử dụng middleware để phân tích các request body dưới dạng JSON
app.use(express.json());

// Sử dụng Multer middleware để xử lý tải lên hình ảnh
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));

// Sử dụng các routes cho recipes
app.use('/recipes', recipeRoutes);
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo');

const app = express();
const port = 5000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://khoatran:1611@cluster0.re5lwts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB Atlas")
}).catch((error) => {
    console.log("Error connecting: ", error);
})

app.use(express.json());

app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
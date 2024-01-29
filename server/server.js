// Backend (Node.js with Express.js and Mongoose)

// Set up Express.js server
const express = require('express');
const app = express();
const port = 3001;

// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose schema and model
const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});
const Item = mongoose.model('Item', itemSchema);

// Define routes
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

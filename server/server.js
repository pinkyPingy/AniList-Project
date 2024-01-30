import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 5173;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://awat:DUJo8XXWsAqnOoS7@anilist1.zol9eib.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define Mongoose schema and model
const itemSchema = new mongoose.Schema({
    itemId: Number,
    name: String,
    imgURL: String,
    genres: String,
    episode: String,
    status: String,
    note: String,
    favorited: Boolean
});
const Item = mongoose.model('Item', itemSchema);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// GET route to retrieve all items
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// POST route to create a new item
app.post('/api/items', async (req, res) => {
    const { itemId, name, imgURL, genres, episode, status, note, favorited } = req.body;
    const newItem = new Item({ itemId, name, imgURL, genres, episode, status, note, favorited });
    try {
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

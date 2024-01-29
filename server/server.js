// Backend (Node.js with Express.js and Mongoose)
import express from 'express';
import mongoose from 'mongoose';

// Set up Express.js server
const app = express();
const port = 3001;
const password = "DUJo8XXWsAqnOoS7";
// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://awat:DUJo8XXWsAqnOoS7@anilist1.zol9eib.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define Mongoose schema and model
const itemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    imgURL: String,
    genres: String,
    episode: Number,
    status: String,
    note: String,
    favorited: Boolean
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

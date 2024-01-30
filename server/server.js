import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL
}));
// Enable CORS for all routes
// Middleware to parse JSON bodies
app.use(express.json());

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
    // res.send("Hello form the other side!")
});

// POST route to create a new item
app.post('/api/items', async (req, res) => {
    console.log(req.body)
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        // Return the complete saved item object in the response
        res.json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Backend route to handle PUT request to increment episode by 1
app.put('/api/items/:id/increment', async (req, res) => {
    const { id } = req.params;
    try {
        // Ensure that id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Increment episode by 1
        item.episode = parseInt(item.episode) + 1;
        item.episode = item.episode.toString()
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Backend code (Node.js with Express)
app.put('/api/items/:id/toggle-favorited', async (req, res) => {
    const { id } = req.params;
    try {
        // Find the item by ID
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // Toggle the 'favorited' boolean
        item.favorited = !item.favorited;
        // Save the updated item
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Backend code (Node.js with Express)
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        // Find the item by ID
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // Update the 'status' string
        item.status = status;
        // Save the updated item
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// // -----------------------------------------------
// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://awat:DUJo8XXWsAqnOoS7@anilist1.zol9eib.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

// import express from 'express';
// import { MongoClient } from 'mongodb';

// const app = express();
// const port = 5173;

// // MongoDB connection string
// const uri = "mongodb+srv://awat:DUJo8XXWsAqnOoS7@AniList1.zol9eib.mongodb.net/myList1";

// // Create a new MongoClient instance
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Connect to MongoDB using the MongoClient
// async function connectToMongoDB() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// // Call the connectToMongoDB function to establish the connection
// connectToMongoDB();

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));

// // GET route to retrieve all items
// app.get('/api/items', async (req, res) => {
//     try {
//         // Access the myList1 database and the items collection
//         const database = client.db("myList1");
//         const collection = database.collection("items");

//         // Find all items in the collection
//         const items = await collection.find().toArray();
//         res.json(items);
//         console.log("Items ja: ", items)
//     } catch (error) {
//         console.error("Error retrieving items:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // POST route to create a new item
// app.post('/api/items', async (req, res) => {
//     try {
//         // Access the myList1 database and the items collection
//         const database = client.db("myList1");
//         const collection = database.collection("items");

//         // Insert the new item into the collection
//         const newItem = req.body;
//         const result = await collection.insertOne(newItem);
//         res.json(result.ops[0]);
//     } catch (error) {
//         console.error("Error creating item:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });



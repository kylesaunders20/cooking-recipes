// server.js
import express from 'express';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

const port = 4000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve the uploaded images

let db;  // Store the database connection

// Connect to MongoDB
const connectToDB = async () => {
    if (db) return db;  // Use existing database connection if available
    const client = new MongoClient("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db("my-react-app-db");
    return db;
}

app.get('/api/recipes', async (req, res) => {
    const db = await connectToDB();
    const recipes = await db.collection('recipes').find({}).toArray();
    res.json(recipes);
});

app.post('/api/addRecipe', upload.single('image'), async (req, res) => {
    try {
        const db = await connectToDB();
        const recipeData = req.body;
        if (req.file) {
            recipeData.image = '/uploads/' + path.basename(req.file.path);
        }
        const result = await db.collection("recipes").insertOne(recipeData);
        if (result.acknowledged) {
            res.json({ message: "Recipe added successfully!", imagePath: recipeData.image });
        } else {
            res.json({ message: "Error adding recipe." });
        }
    } catch (error) {
        console.error("Error in /api/addRecipe:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete('/api/removeRecipe', async (req, res) => {
    console.log("Attempting to remove recipe with name:", req.body.recipeName);
    const db = await connectToDB();
    const result = await db.collection("recipes").deleteOne({ name: req.body.recipeName });
    console.log("Deletion result:", result);

    if (result.deletedCount > 0) {
      res.json({ message: "Recipe removed successfully!" });
    } else {
      res.json({ message: "Error removing recipe or recipe not found." });
    }
});

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

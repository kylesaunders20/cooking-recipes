const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cookingRecipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

const Recipe = require('./recipeSchema'); 

// Endpoint to fetch all recipes
app.get('/api/recipes', (req, res) => {
    Recipe.find({})
        .then(recipes => res.json(recipes))
        .catch(error => {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Failed to fetch recipes' });
        });
});

app.post('/api/recipes', upload.single('image'), (req, res) => {
    const { name, description, ingredients, directions } = req.body;
    const imageUrl = '/uploads/' + req.file.filename; 

    const newRecipe = new Recipe({
        name,
        description,
        ingredients: ingredients.split(',').map(item => item.trim()),
        instructions: directions.split('\n').map(item => item.trim()),
        imageUrl
    });

    newRecipe.save()
        .then(savedRecipe => res.json(savedRecipe))
        .catch(error => {
            console.error('Error while saving recipe:', error);
            res.status(500).json({ error: 'Failed to save recipe' });
        });
});


// serves uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the React frontend
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

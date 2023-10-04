const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: [String],
    instructions: [String],
    imageUrl: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

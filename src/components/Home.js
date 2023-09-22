import React, { useState, useEffect } from 'react';
import recipes from '../data/recipes.json';
import RecipeCard from './RecipeCard';

function Home() {
    const [currentRecipes, setCurrentRecipes] = useState(recipes);

    const handleRemove = (id) => {
        console.log("Removing recipe with ID:", id);
        const updatedRecipes = currentRecipes.filter(recipe => recipe.id !== id);
        setCurrentRecipes(updatedRecipes);
        console.log("Number of recipes after removal:", currentRecipes.length);

    };

    useEffect(() => {
        console.log("Updated number of recipes:", currentRecipes.length);
    }, [currentRecipes]);

    return (
        <div>
            <h2>All Recipes</h2>
            {currentRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onRemove={handleRemove} />
            ))}
        </div>
    );
}

export default Home;
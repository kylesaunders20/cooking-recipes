import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import recipes from '../data/recipes.json';
import RecipeCard from './RecipeCard';
import AddRecipe from './AddRecipe';

function Home() {
    const [currentRecipes, setCurrentRecipes] = useState(recipes);

    const handleRemove = (id) => {
        console.log("Removing recipe with ID:", id);
        const updatedRecipes = currentRecipes.filter(recipe => recipe.id !== id);
        setCurrentRecipes(updatedRecipes);
        console.log("Number of recipes after removal:", currentRecipes.length);

    };

    const handleAddRecipe = (newRecipe) => {
        console.log("handleAddRecipe called with:", newRecipe);
        setCurrentRecipes(prevRecipes => [...prevRecipes, newRecipe]);
    };
    

    return (
        <div>
            <Routes>
                <Route path="/*" element={
                    <div>
                        <h2>All Recipes</h2>
                        {currentRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} onRemove={handleRemove} />
                        ))}
                    </div>
                } />
                <Route path="/add" element={
                <AddRecipe 
                    onAddRecipe={handleAddRecipe} 
                    highestId={Math.max(...currentRecipes.map(r => r.id))} 
                    />
                } />
                </Routes> 
        </div>
    );
}

export default Home;
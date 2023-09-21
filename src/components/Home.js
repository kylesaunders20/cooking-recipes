import React from 'react';
import recipes from '../data/recipes.json';
import RecipeCard from './RecipeCard';

function Home() {
    return (
        <div>
            <h2>All Recipes</h2>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default Home;
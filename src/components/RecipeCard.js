import React from "react";

function RecipeCard({ recipe }) {
    return (
        <div>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} />
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Directions:</strong> {recipe.directions}</p>
            <p><strong>Description:</strong> {recipe.description}</p>
            {/* Placeholder for remove button to be added later */}
        </div>
    );
}

export default RecipeCard;
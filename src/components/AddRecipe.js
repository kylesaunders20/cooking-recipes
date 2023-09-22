import React, { useState } from 'react';

function AddRecipe({ onAddRecipe, highestId }) {
    const [formData, setFormData] = useState({
        name: '',
        ingredients: '',
        directions: '',
        description: '',
        image: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const ingredientsArray = formData.ingredients.split(',').map(item => item.trim());

        const newId = highestId + 1;
        const newRecipe = { ...formData, ingredients: ingredientsArray, id: newId };
        console.log("About to call onAddRecipe with:", newRecipe);

        onAddRecipe(newRecipe);

        setFormData({
            name: '',
            ingredients: '',
            directions: '',
            description: '',
            image: ''
        });
    };

    return (
        <div>
            <h2>Add New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name ="name" placeholder='Recipe Name'
                value={formData.name} onChange={handleChange} />
                <textarea name="ingredients" placeholder='Ingredients (comma-separated)'
                value={formData.ingredients} onChange={handleChange} />
                <textarea name="directions" placeholder='Directions'
                value={formData.directions} onChange={handleChange} />
                <textarea name="description" placeholder='Description'
                value={formData.description} onChange={handleChange} />
                <select name="image" value={formData.image} onChange={handleChange}>
                    <option value="">Select an Image</option>
                    <option value="/SpaghettiCarbonara.jpg">Placeholder 1</option>
                </select>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipe;
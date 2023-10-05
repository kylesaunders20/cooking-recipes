import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import AddRecipe from './AddRecipe';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
    const [currentRecipes, setCurrentRecipes] = useState([]);

    useEffect(() => {
        fetch('/api/recipes')
            .then(response => response.json())
            .then(data => setCurrentRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleRemove = (id) => {
        console.log("Removing recipe with ID:", id);
        fetch(`/api/removeRecipe`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeName: id }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            const updatedRecipes = currentRecipes.filter(recipe => recipe.name !== id);
            setCurrentRecipes(updatedRecipes);
        })
        .catch(error => console.error('Error:', error));
    };

    const handleAddRecipe = (newRecipe) => {
        console.log("handleAddRecipe called with:", newRecipe);
        console.log("Current recipes before adding new one:", currentRecipes);
        console.log("Current recipes after adding new one:", [...currentRecipes, newRecipe]);



        setCurrentRecipes(prevRecipes => [...prevRecipes, newRecipe]);
        console.log("Updated recipes:", currentRecipes);

    };
    console.log("Current recipes:", currentRecipes);


    return (
        <Container>
            <Routes>
                <Route path="/*" element={
                    <div>
                        <h2>All Recipes</h2>
                        <Row>
                            {currentRecipes.map(recipe => (
                                <Col xs={12} md={6} lg={4} key={recipe.id}>
                                    <RecipeCard recipe={recipe} onRemove={handleRemove} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                } />
                <Route path="/add" element={<AddRecipe onAddRecipe={handleAddRecipe} highestId={Math.max(...currentRecipes.map(r => r.id))} />} />
            </Routes> 
        </Container>
    );
}

export default Home;
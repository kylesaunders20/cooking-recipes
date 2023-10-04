import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import recipes from '../data/recipes.json';
import RecipeCard from './RecipeCard';
import AddRecipe from './AddRecipe';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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
                                    <Card className="mb-4">
                                        <Card.Img variant="top" src={recipe.image} />
                                        <Card.Body>
                                            <Card.Title>{recipe.name}</Card.Title>
                                            <Card.Text>{recipe.description}</Card.Text>
                                            <Button variant="danger" onClick={() => handleRemove(recipe.id)}>Delete</Button>
                                        </Card.Body>
                                    </Card>
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
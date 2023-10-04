import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
        console.log("New recipe object:", newRecipe);

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
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2>Add New Recipe</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="recipeName">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder='Recipe Name'
                                value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="recipeIngredients">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control as="textarea" name="ingredients" placeholder='Ingredients (comma-separated)'
                                value={formData.ingredients} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="recipeDirections">
                            <Form.Label>Directions</Form.Label>
                            <Form.Control as="textarea" name="directions" placeholder='Directions'
                                value={formData.directions} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="recipeDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" placeholder='Description'
                                value={formData.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="recipeImage">
                            <Form.Label>Select Image</Form.Label>
                            <Form.Control as="select" name="image" value={formData.image} onChange={handleChange}>
                                <option value="">Select an Image</option>
                                <option value="/Cheeseburger.jpg">Placeholder 1</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Recipe</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddRecipe;
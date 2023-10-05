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

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });
    
        // Send formDataObj to the backend using an HTTP POST request
        fetch('/api/addRecipe', {
            method: 'POST',
            body: formDataObj
        })
        .then(response => response.json())
        .then(data => {
            alert('Recipe submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
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
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleFileChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Recipe</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddRecipe;
import React from "react";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap"

function RecipeCard({ recipe, onRemove }) {
    useEffect(() => {
        console.log("Rendering recipe:", recipe.name);
    }, [recipe.name]);
    return (
        <Card className="mb-4">
            <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
            <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <Card.Text><strong>Ingredients:</strong> {recipe.ingredients}</Card.Text>
                <Card.Text><strong>Directions:</strong> {recipe.directions}</Card.Text>
                <Card.Text><strong>Description:</strong> {recipe.description}</Card.Text>
                <Button variant="danger" onClick={() => onRemove(recipe.name)}>Remove</Button>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;
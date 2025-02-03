import { useState } from "react"
import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"


export default function Main() {

    const [ingredients, setIngredients] = useState([])

    const [recipe, setRecipe] = React.useState("")

    const [loading, setLoading] = useState(false);



    async function getRecipe() {
        setLoading(true); // Start loading
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipe)
        setLoading(false); // Stop loading
    }



    function addIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient") //the name of the input
        if (newIngredient.trim() === "") return; // Avoid empty entries

        setIngredients((prevIngredients) => {
            return [...prevIngredients, newIngredient]
        })

        event.target.reset(); // Clear input field after submission
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>

            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />}

            {/* Show loading message while fetching recipe */}
            {loading && <p>Please wait while we load the recipe, this might take a few seconds...</p>}
            {/* *************** */}

            {recipe && !loading && <ClaudeRecipe recipe={recipe} />}
        </main >
    )
}
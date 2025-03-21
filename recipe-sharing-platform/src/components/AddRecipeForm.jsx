import React, { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!ingredients) newErrors.ingredients = "Ingredients are required.";
    if (!steps) newErrors.steps = "Preparation steps are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop if validation fails

    const ingredientsArray = ingredients.split("\n").map((item) => item.trim());
    if (ingredientsArray.length < 2) {
      setErrors({ ingredients: "Please enter at least two ingredients." });
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredientsArray,
      steps: steps.split("\n"),
    };

    onAddRecipe(newRecipe);
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto bg-[rgb(35,75,51)] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label className="block font-medium bg-[rgb(244,230,195)">Recipe Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter recipe title"
          />
        </div>
        <div>
          <label className="block font-medium">Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter ingredients (one per line)"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Preparation Steps:</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter steps (one per line)"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[rgb(244,230,195) text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
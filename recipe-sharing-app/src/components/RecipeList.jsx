import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes || []);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  // Re-run the filter function whenever searchTerm changes
  useEffect(() => {
    filterRecipes();
  }, [searchTerm]);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;

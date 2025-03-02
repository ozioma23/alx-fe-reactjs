import React from "react";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  // Select only the needed state from Zustand
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);

  // Memoize favorite recipes to prevent unnecessary recalculations
  const favoriteRecipes = React.useMemo(() => {
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  }, [recipes, favorites]);

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No favorite recipes yet!</p>
      )}
    </div>
  );
};

export default FavoritesList;
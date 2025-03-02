import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  cookingTime: "",
  ingredients: "",
  favorites: [],
  filteredRecipes: [],
  recommendations: [],

  // Helper function to filter recipes based on search and filters
  filterRecipes: () => {
    const { recipes, searchTerm, cookingTime, ingredients } = get();
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cookingTime ? recipe.cookingTime <= cookingTime : true) &&
      (ingredients
        ? recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(ingredients.toLowerCase())
          )
        : true)
    );
  },

  // Set search term and update filtered recipes
  setSearchTerm: (term) =>
    set(() => ({ searchTerm: term, filteredRecipes: get().filterRecipes() })),

  // Set cooking time and update filtered recipes
  setCookingTime: (time) =>
    set(() => ({ cookingTime: time, filteredRecipes: get().filterRecipes() })),

  // Set ingredients and update filtered recipes
  setIngredients: (ingredient) =>
    set(() => ({ ingredients: ingredient, filteredRecipes: get().filterRecipes() })),

  // Add a new recipe and update filteredRecipes
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return { recipes: updatedRecipes, filteredRecipes: get().filterRecipes() };
    }),

  // Set full recipe list and update filteredRecipes
  setRecipes: (recipes) => set(() => ({ recipes, filteredRecipes: recipes })),

  // Delete a recipe and update filteredRecipes
  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      return { recipes: updatedRecipes, filteredRecipes: get().filterRecipes() };
    }),

  // Update a recipe and refresh filteredRecipes
  updateRecipe: (id, updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      );
      return { recipes: updatedRecipes, filteredRecipes: get().filterRecipes() };
    }),

  // Favorite Recipes Management
  addFavorite: (recipeId) =>
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state; // Avoid duplicates
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),
    generateRecommendations: () =>
      set((state) => {
        const { recipes, favorites } = state;
    
        if (!favorites.length) return state; // Avoid unnecessary updates when no favorites
    
        // Find recommended recipes based on common ingredients
        const recommended = recipes.filter((recipe) =>
          favorites.some((favId) =>
            recipe.ingredients.some((ing) =>
              recipes.find((fav) => fav.id === favId)?.ingredients.includes(ing)
            )
          )
        );
    
        return { ...state, recommendations: recommended };
      }),    
  }));

export default useRecipeStore;

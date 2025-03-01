import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  cookingTime: "",
  ingredients: "",
  filteredRecipes: [],

  // Function to filter recipes
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        (state.cookingTime ? recipe.cookingTime <= state.cookingTime : true) &&
        (state.ingredients
          ? recipe.ingredients.some((ing) =>
              ing.toLowerCase().includes(state.ingredients.toLowerCase())
            )
          : true)
      ),
    })),

  // Set search term and filter recipes
  setSearchTerm: (term) =>
    set((state) => {
      const updatedState = { searchTerm: term };
      return { ...updatedState, filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase()) &&
        (state.cookingTime ? recipe.cookingTime <= state.cookingTime : true) &&
        (state.ingredients
          ? recipe.ingredients.some((ing) =>
              ing.toLowerCase().includes(state.ingredients.toLowerCase())
            )
          : true)
      ) };
    }),

  // Set cooking time and filter recipes
  setCookingTime: (time) =>
    set((state) => {
      const updatedState = { cookingTime: time };
      return { ...updatedState, filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        (time ? recipe.cookingTime <= time : true) &&
        (state.ingredients
          ? recipe.ingredients.some((ing) =>
              ing.toLowerCase().includes(state.ingredients.toLowerCase())
            )
          : true)
      ) };
    }),

  // Set ingredients and filter recipes
  setIngredients: (ingredient) =>
    set((state) => {
      const updatedState = { ingredients: ingredient };
      return { ...updatedState, filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        (state.cookingTime ? recipe.cookingTime <= state.cookingTime : true) &&
        (ingredient
          ? recipe.ingredients.some((ing) =>
              ing.toLowerCase().includes(ingredient.toLowerCase())
            )
          : true)
      ) };
    }),

  // Add a new recipe and update filteredRecipes
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
          (state.cookingTime ? recipe.cookingTime <= state.cookingTime : true) &&
          (state.ingredients
            ? recipe.ingredients.some((ing) =>
                ing.toLowerCase().includes(state.ingredients.toLowerCase())
              )
            : true)
        ),
      };
    }),

  // Set full recipe list and update filteredRecipes
  setRecipes: (recipes) =>
    set(() => ({ recipes, filteredRecipes: recipes })),

  // Delete a recipe and update filteredRecipes
  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
          (state.cookingTime ? recipe.cookingTime <= state.cookingTime : true) &&
          (state.ingredients
            ? recipe.ingredients.some((ing) =>
                ing.toLowerCase().includes(state.ingredients.toLowerCase())
              )
            : true)
        ),
      };
    }),

  // Update a recipe and refresh filteredRecipes
  updateRecipe: (id, updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
          (state.cookingTime ? recipe.cookingTime <= state.cookingTime : true) &&
          (state.ingredients
            ? recipe.ingredients.some((ing) =>
                ing.toLowerCase().includes(state.ingredients.toLowerCase())
              )
            : true)
        ),
      };
    }),
  generateRecommendations: () => {
    const { recipes, favorites } = get();

    // Example: Recommend recipes with similar ingredients or categories
    const recommended = recipes.filter((recipe) =>
      favorites.some((favId) =>
        recipe.ingredients.some((ing) =>
          recipes.find((fav) => fav.id === favId)?.ingredients.includes(ing)
        )
      )
    );

    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;
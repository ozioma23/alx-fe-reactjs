import { useState, useEffect} from "react";
import recipesData from "../data.json";
import { useParams } from "react-router-dom";


const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null)
    
  useEffect(() => {
    // Find the recipe with the matching ID
    const selectedRecipe = recipesData.find((r) => r.id === parseInt(id));

    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [id]);

  if (!recipe) {
    return <div className="text-center text-gray-700 text-lg">Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[rgb(244,230,195)] p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-96 h-64 object-cover rounded-md my-4" />
      <p className="text-gray-700 text-lg text-center max-w-2xl">{recipe.summary}</p>
      <div className="mt-6 p-6 bg-green-900 shadow-md rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-white mb-3">Ingredients</h2>
        <ul className="list-disc pl-5 text-white">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}className="mb-1">{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 p-4 bg-white shadow-md rounded-lg w-full max-w-2xl">
  <h2 className="text-2xl font-semibold text-[rgb(35,75,51)]">Instructions</h2>
  <ol className="list-decimal pl-5 text-[rgb(35,75,51)]">
    {recipe.instructions.map((step, index) => (
      <li key={index} className="mb-2">{step}</li>
    ))}
  </ol>
</div>
    </div>
  );
};

export default RecipeDetail;



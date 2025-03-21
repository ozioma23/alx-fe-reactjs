import { useState, useEffect } from "react"
import recipesData from "../data.json";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    setRecipes(recipesData)
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(35,75,51)] p-6sm:p-10 md:p-16">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md" />
            <Link to={`/recipe/${recipe.id}`} className="text-xl font-semibold text-gray-700 mt-4 hover:text-blue-500">
              {recipe.title}
            </Link>
            <p className="text-gray-600 mt-2">{recipe.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
};
export default HomePage

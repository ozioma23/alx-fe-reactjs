import { useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const DeleteRecipeButton = ({ recipeId }) => {
  const { deleteRecipe } = useRecipeStore();
  const navigate = useNavigate(); // Import useNavigate

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId);
      navigate("/"); // Redirects to home page or another route
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteRecipeButton;
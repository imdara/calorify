import { setFoodItem } from "../redux/foodItemSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import supabase from "../config/supabase";
import { useEffect, useState } from "react";

const EditFoodItem = () => {
  const navigate = useNavigate();
  const [currFoodItem, setCurrFoodItem] = useState({
    name: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });
  const { id } = useParams();
  const fetchCurrentFood = async () => {
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .eq("id", parseInt(id));
    if (error) {
      console.error("Error fetching current food item:", error);
      return;
    } else setCurrFoodItem(data[0]);
    return;
  };

  useEffect(() => {
    fetchCurrentFood();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrFoodItem({ ...currFoodItem, [name]: value });
  };

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await supabase
        .from("foods")
        .update({
          name: currFoodItem.name,
          calories: currFoodItem.calories,
          protein: currFoodItem.protein,
          fat: currFoodItem.fat,
          carbs: currFoodItem.carbs,
        })
        .eq("id", parseInt(id));
      navigate("/food-items");
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };
  return (
    <>
      <h2 className="text-center font-bold mt-2">Create a new food item</h2>
      <form onSubmit={editHandler} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            value={currFoodItem.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Food name"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="calories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Calories
          </label>
          <input
            value={currFoodItem.calories}
            onChange={handleChange}
            type="text"
            id="calories"
            name="calories"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Calories per 100g"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="protein"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Protein
          </label>
          <input
            value={currFoodItem.protein}
            onChange={handleChange}
            type="text"
            id="protein"
            name="protein"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Protein per 100g"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fat"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fat
          </label>
          <input
            value={currFoodItem.fat}
            onChange={handleChange}
            type="text"
            id="fat"
            name="fat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fat per 100g"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="carbs"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Carbs
          </label>
          <input
            value={currFoodItem.carbs}
            onChange={handleChange}
            type="text"
            id="carbs"
            name="carbs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Carbs per 100g"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default EditFoodItem;

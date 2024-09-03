import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import toPascalCase from "../utils/toPascalCase";

const MealForm = ({ meals, setMeals }) => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState({ food: null, quantity: 0 });
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [meal, setMeal] = useState({
    name: "",
    foods: [],
  });

  const getFoods = async () => {
    const { data, error } = await supabase
      .from("foods")
      //.select('id', 'name')
      .select("*");
    setFoods(data);
  };

  useEffect(() => {
    getFoods();
  }, []);

  const addFoodHandler = () => {
    setSelectedFoods([...selectedFoods, selectedFood]);
    // console.log(selectedFood);
    // const foodObj = foods.find((food) => food.id === +selectedFood);
    // setSelectedFoods([...selectedFoods, foodObj]);
  };

  const deleteFoodHandler = (id) => {
    setSelectedFoods(selectedFoods.filter((food) => food.food.id !== id));
  };

  const addMealHandler = async (e) => {
    e.preventDefault();
    await supabase.from("meals").insert(meal);
    setMeals([...meals, meal]);
    setMeal({ name: "", foods: [] });
    setSelectedFoods([]);
  };

  useEffect(() => {
    setMeal({
      ...meal,
      foods: selectedFoods,
      totalCalories:
        meal.foods.length > 1
          ? Math.ceil(
              meal.foods
                .map(
                  (foodObj) => (foodObj.food.calories * foodObj.quantity) / 100
                )
                .reduce((a, b) => a + b, 0)
            )
          : (meal.foods[0]?.calories * meal.foods[0]?.quantity) / 100,
    });
  }, [selectedFoods]);
  return (
    <>
      <h2 className="text-center font-bold mt-2">Create a new meal</h2>
      <form onSubmit={addMealHandler} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => setMeal({ ...meal, name: e.target.value })}
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Meal name"
            required
          />
        </div>
        <div className="mb-5">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Food/s
          </p>
          <div className="flex flex-row justify-start items-center space-x-2">
            {selectedFoods.map((selectFood) => (
              <div>
                <p className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  {toPascalCase(selectFood.food.name)} ({selectFood.quantity}g)
                  <svg
                    className="inline cursor-pointer hover:fill-red-400 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#5f6368"
                    onClick={() => deleteFoodHandler(selectFood.food.id)}
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-sm mx-auto">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an option
          </p>
          <select
            value={selectedFood.name}
            onChange={(e) =>
              setSelectedFood({
                ...selectedFood,
                food: JSON.parse(e.target.value),
              })
            }
            id="foods"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a food</option>
            {foods?.map((food) => (
              <option value={JSON.stringify(food)}>
                {toPascalCase(food.name)}
              </option>
            ))}
          </select>
          <div className="mb-5">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Food Quantity
            </label>
            <input
              onChange={(e) =>
                setSelectedFood({
                  ...selectedFood,
                  quantity: e.target.value,
                })
              }
              type="number"
              id="quantity"
              name="quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Food Quantity in g"
              required
            />
          </div>
          <input
            onClick={addFoodHandler}
            className="cursor-pointer text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
            type="button"
            value="Add"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default MealForm;

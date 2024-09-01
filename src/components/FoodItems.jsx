import { useEffect, useState } from "react";
import supabase from "../config/supabase";

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const getFoods = async () => {
    const { data, error } = await supabase.from("foods").select("*");
    //.order('name', { ascending: true })

    if (error) {
      console.error(error);
    } else setFoodItems(data);
  };

  const deleteFoodHandler = async (id) => {
    await supabase.from("foods").delete().eq("id", id);
    getFoods();
  };

  const toPascalCase = (s) =>
    s.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    });

  useEffect(() => {
    getFoods();
  }, [foodItems]);
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Food name
              </th>
              <th scope="col" className="px-6 py-3">
                Calories (per 100g)
              </th>
              <th scope="col" className="px-6 py-3">
                Protein (per 100g)
              </th>
              <th scope="col" className="px-6 py-3">
                Fat (per 100g)
              </th>
              <th scope="col" className="px-6 py-3">
                Carbs (per 100g)
              </th>
              <th scope="col" className="relative px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((foodItem) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {toPascalCase(foodItem.name)}
                </th>
                <td className="px-6 py-4">{foodItem.calories}</td>
                <td className="px-6 py-4">{foodItem.protein}g</td>
                <td className="px-6 py-4">{foodItem.fat}g</td>
                <td className="px-6 py-4">{foodItem.carbs}g</td>
                <td className="flex justify-around items-center px-6 py-4">
                  <svg
                    className="cursor-pointer hover:fill-blue-200"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  <svg
                    className="cursor-pointer hover:fill-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                    onClick={() => deleteFoodHandler(foodItem.id)}
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItems;

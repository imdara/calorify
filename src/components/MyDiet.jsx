import { useState } from "react";
import MealForm from "./MealForm";

const MyDiet = () => {
  const [calories, setCalories] = useState(250);
  const [meals, setMeals] = useState([]);
  return (
    <>
      <h2 className="text-center text-lg font-bold mt-2">My Diet</h2>
      <div className="flex space-x-4 ">
        <div className="font-semibold text-lg border border-slate-600 rounded-lg w-96 p-2 ml-2 my-2">
          <span className="font-bold">Calorie Budget:</span>
          {"  "}
          <span
            style={{
              color: `${
                calories / 20 < 80
                  ? "#4a8bff"
                  : calories / 20 < 90
                  ? "#f9f504"
                  : "#de523c"
              }`,
            }}
          >
            {calories}
          </span>
          <span className="text-slate-800">
            /2000Kcal{"  "}
            <span
              style={{
                color: `${
                  calories / 20 < 80
                    ? "#4a8bff"
                    : calories / 20 < 90
                    ? "#f9f504"
                    : "#de523c"
                }`,
              }}
            >
              ({calories / 20}%)
            </span>
          </span>
          <div className="w-full border rounded-sm h-6 my-1">
            <div
              className="h-[1.38rem] rounded-s-sm text-[1rem] "
              style={{
                backgroundColor: `${
                  calories / 20 < 80
                    ? "#4a8bff"
                    : calories / 20 < 90
                    ? "#f9f504"
                    : "#de523c"
                }`,
                width: `${calories / 20}%`,
                lineHeight: "1.2rem",
              }}
            ></div>
          </div>
        </div>
        {meals.map((meal) => (
          <div className="font-semibold text-lg border border-slate-600 rounded-lg w-96 p-2 my-2">
            <span className="font-bold">Meal:</span>
            {"  "}
            <span>{meal.name}</span>
            <p>
              <span className="font-bold">Food/s:</span>{" "}
              {meal.foods.map((food) => (
                <span>{food.name}, </span>
              ))}
            </p>
            <p>
              <span className="font-bold">Calories:</span>{" "}
              {meal.foods.reduce((a, b) => a.calories + b.calories, 0)}
            </p>
          </div>
        ))}
      </div>
      <MealForm meals={meals} setMeals={setMeals} />
    </>
  );
};

export default MyDiet;

import { useEffect, useState } from "react";
import { fetchMeals } from "../methods/http.js";
import Meal from "./Meal.jsx";

export default function Meals({ handleAddMeal }) {
  const [_meals, setMeals] = useState([]);
  useEffect(() => {
    async function _fetchMeals() {
      try {
        const datas = await fetchMeals();
        setMeals(datas);
      } catch (error) {
        return <p>Couille dans le potage.</p>;
      }
    }
    _fetchMeals();
  }, []);

  return (
    <div id="meals">
      {_meals.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </div>
  );
}

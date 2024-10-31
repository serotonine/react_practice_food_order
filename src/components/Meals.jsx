import { useHttp } from "../hooks/useHttp.js";
import { REST_URL } from "../config";
import Meal from "./Meal.jsx";

const httpConfig = {
  method: "GET",
};
export default function Meals({ handleAddMeal }) {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp(`${REST_URL}/meals`, httpConfig, []);

  if (isLoading) {
    return <p className="text-center">Fetching meals...</p>;
  }

  return (
    <div id="meals">
      {meals.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </div>
  );
}

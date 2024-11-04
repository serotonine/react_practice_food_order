import { useHttp } from "../hooks/useHttp.js";
import { REST_URL } from "../config";
import Meal from "./Meal.jsx";
import Error from "./UI/Error.jsx";

const httpConfig = {
  method: "GET",
};
export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp(`${REST_URL}/meals`, httpConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <div id="meals">
      {meals.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </div>
  );
}

import { setPrice } from "../methods/utils.js";
import { REST_URL } from "../config.js";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";

export default function Meal({ meal }) {
  const _cartContext = useContext(CartContext);
  // FUNCTIONS //
  function handleAddMeal() {
    _cartContext.addMeal(meal);
  }
  return (
    <section className="meal-item">
      <article>
        <img src={`${REST_URL}/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <div className="meal-item-price">{setPrice(meal.price)}</div>
          <div className="meal-item-description">{meal.description}</div>
        </div>
        <div className="meal-item-actions">
          <Button onClick={handleAddMeal}>Add to cart</Button>
        </div>
      </article>
    </section>
  );
}

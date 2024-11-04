import { createContext, useReducer } from "react";

const CartContext = createContext({
  cart: [],
  addMeal: (meal) => {},
  removeMeal: (id) => {},
  resetCart: () => {},
});
// Return an updated state.
function cartReducer(state, action) {
  let isAddedIndex;
  // Make a copy of previous state.
  const updatedCart = [...state.cart];
  switch (action.type) {
    case "ADD_MEAL":
      // Check if added meal is already in the cart.
      isAddedIndex = state.cart.findIndex((item) => item.id === action.meal.id);

      if (isAddedIndex > -1) {
        const existingMeal = state.cart[isAddedIndex];
        const updatedMeal = {
          ...existingMeal,
          quantity: existingMeal.quantity + 1,
        };
        updatedCart[isAddedIndex] = updatedMeal;
      } else {
        updatedCart.push({ ...action.meal, quantity: 1 });
      }
      return { ...state, cart: updatedCart };
      break;
    case "REMOVE_MEAL":
      // Check if added meal is already in the cart.
      isAddedIndex = state.cart.findIndex((item) => item.id === action.id);
      const existingMeal = state.cart[isAddedIndex];

      if (existingMeal.quantity === 1) {
        updatedCart.splice(isAddedIndex, 1);
      } else {
        const updatedMeal = {
          ...existingMeal,
          quantity: existingMeal.quantity - 1,
        };
        updatedCart[isAddedIndex] = updatedMeal;
      }
      return { ...state, cart: updatedCart };
      break;
    case "RESET_CART":
      return { ...state, cart: [] };
      break;
  }
  return state;
}

/*  Define a contextProvider component
    which can be wrapped around our Components
    to make this context available to them. 
  */
export function CartContextProvider({ children }) {
  // Params: execute fct, initial value.
  const [userCart, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  // Dispatch functions.
  function addMeal(meal) {
    dispatch({ type: "ADD_MEAL", meal });
  }
  function removeMeal(id) {
    dispatch({ type: "REMOVE_MEAL", id });
  }
  function resetCart() {
    dispatch({ type: "RESET_CART" });
  }
  const cartContext = {
    cart: userCart.cart,
    addMeal,
    removeMeal,
    resetCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;

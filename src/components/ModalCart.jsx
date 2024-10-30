import { setPrice, getTotal } from "../methods/utils.js";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./Modal.jsx";
import Button from "./UI/Button.jsx";

export default function ModalCart({}) {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const handleCloseModal = function () {
    userProgressContext.hideCart();
  };

  if (cartContext.cart.length === 0) {
    return (
      <Modal className="cart" isOpen={userProgressContext.progress === "cart"}>
        <p>You cart is currently empty.</p>
        <div className="modal-actions">
          <Button textOnly={true} onClick={handleCloseModal}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal className="cart" isOpen={userProgressContext.progress === "cart"}>
      {cartContext.cart.map((item) => {
        return (
          <div className="cart-item" key={item.id}>
            <p>{`${item.name} - ${item.quantity} x ${setPrice(item.price)}`}</p>
            <div className="cart-item-actions">
              <button onClick={() => cartContext.removeMeal(item.id)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => cartContext.addMeal(item)}>+</button>
            </div>
          </div>
        );
      })}
      <div className="cart-total">
        Total: {setPrice(getTotal(cartContext.cart))}
      </div>
      <div className="modal-actions">
        <Button textOnly={true} onClick={handleCloseModal}>
          Close
        </Button>
        <Button>Go to checkout</Button>
      </div>
    </Modal>
  );
}

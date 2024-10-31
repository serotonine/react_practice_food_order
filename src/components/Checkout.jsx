import { useContext } from "react";
import { setPrice, getTotal } from "../methods/utils.js";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./Modal";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout({}) {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  function handleClose() {
    userProgressContext.hideCheckout();
  }
  return (
    <Modal
      isOpen={userProgressContext.progress === "checkout"}
      onCloseHandler={handleClose}
    >
      <h2>Checkout</h2>
      <form>
        <p>Total Amount: {setPrice(getTotal(cartContext.cart))}</p>
        <Input label="Full Name" id="full-name" type="text" required />
        <Input label="Email Adress" id="email" type="email" required />
        <Input label="Street" id="street" type="text" required />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" required />
          <Input label="City" id="city" type="text" required />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

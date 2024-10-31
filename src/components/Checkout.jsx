import { useContext } from "react";
import { setPrice, getTotal } from "../methods/utils.js";
import { REST_URL } from "../config.js";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./Modal";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout({}) {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  // HANDLERS //

  // Close form.
  function handleClose() {
    userProgressContext.hideCheckout();
  }
  // Submit form.
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());
    fetch(`${REST_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartContext.cart,
          customer: customerData,
        },
      }),
    });
  }
  return (
    <Modal
      isOpen={userProgressContext.progress === "checkout"}
      onCloseHandler={handleClose}
    >
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p>Total Amount: {setPrice(getTotal(cartContext.cart))}</p>
        <Input label="Full Name" id="name" type="text" required />
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

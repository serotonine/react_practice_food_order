import { useContext } from "react";
import { useHttp } from "../hooks/useHttp.js";
import { setPrice, getTotal } from "../methods/utils.js";
import { REST_URL } from "../config.js";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./Modal";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./UI/Error.jsx";

const httpConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export default function Checkout({}) {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  // HANDLERS //
  const {
    data: meals,
    isLoading,
    error,
    sendRequest,
    resetData,
  } = useHttp(`${REST_URL}/orders`, httpConfig);

  // Close form.
  function handleClose() {
    userProgressContext.hideCheckout();
  }
  // Submit form.
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());
    // useHttp.
    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.cart,
          customer: customerData,
        },
      })
    );
  }
  // Reset Form
  function handleCloseOrder() {
    handleClose();
    cartContext.resetCart();
    resetData();
  }
  // SUBMIT //
  let cta = (
    <>
      <p className="modal-actions">
        <Button textOnly type="button" onClick={handleClose}>
          Close
        </Button>
        <Button>Submit Order</Button>
      </p>
    </>
  );
  if (isLoading) {
    cta = (
      <>
        <p className="modal-actions">
          {" "}
          <span>Sending order...</span>
        </p>
      </>
    );
  }
  if (error) {
    cta = <Error title="Failed to send order" message={error} />;
  }
  if (meals && meals.message && !error) {
    return (
      <Modal
        isOpen={userProgressContext.progress === "checkout"}
        onCloseHandler={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was send. The delivery will take 30mn.</p>
        <p>Thank you for your order!</p>
        <Button onClick={handleCloseOrder}>Close</Button>
      </Modal>
    );
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
        {cta}
      </form>
    </Modal>
  );
}

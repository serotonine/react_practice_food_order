import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header({ sitename }) {
  const _cartContext = useContext(CartContext);
  const _userContext = useContext(UserProgressContext);

  const total = _cartContext.cart.reduce(
    (prevTotal, item) => prevTotal + item.quantity,
    0
  );
  const handleShowCart = function () {
    _userContext.showCart();
  };
  return (
    <>
      {/* <Cart key={Math.random()} /> */}
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="React Food logo" />
          <h1>{sitename}</h1>
        </div>
        <div className="cart-item-actions">
          <Button
            textOnly={true}
            onClick={handleShowCart}
          >{`Cart (${total})`}</Button>
        </div>
      </header>
    </>
  );
}

import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import ModalCart from "./components/ModalCart.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  const [userCart, setUserCart] = useState([]);
  const dialog = useRef();
  function handleOpenModal() {
    dialog.current.open();
  }

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <main>
          <Header sitename="ReactFood" />
          <Meals />
          <ModalCart />
        </main>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

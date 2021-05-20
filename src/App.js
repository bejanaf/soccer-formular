//console.log(event.target.name); // Name des Eingabefeldes
//console.log(event.target.value); // Wert des Eingabefeldes
// value={player.name} hängt den dynamisch erzeugten value an
import { NavLink, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShoppingCart from './ShoppingCart';
import Home from './Home';
import { loadFromLocal, saveToLocal } from './lib/localStorage';

function App() {
  const [shoppingCart, setShoppingCart] = useState(
    loadFromLocal('shoppingCart') ?? []
  );

  useEffect(() => {
    saveToLocal('shoppingCart', shoppingCart);
  }, [shoppingCart]);

  function addToShoppingCart(player) {
    setShoppingCart([...shoppingCart, player]); // die Formulareingaben werden hier hineingeschoben
  }

  return (
    <Box>
      <NavLink to="/">
        <h1>German Soccer Transfer:</h1>
      </NavLink>
      <NavLink to="/shoppingCart">Zum Warenkorb</NavLink>
      <Switch>
        <Route exact path="/">
          <Home onAddToShoppingCart={addToShoppingCart} />
        </Route>
        <Route path="/shoppingCart">
          <ShoppingCart playerItems={shoppingCart} />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;

const Box = styled.div`
  padding-left: 1rem;

  h1 {
    color: white;
    font-size: 3.5rem;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;

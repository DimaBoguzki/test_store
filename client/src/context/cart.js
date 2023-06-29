
import React from 'react';
import axios from 'axios';
import { useUserContext } from './auth';

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: [...action.payload],
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
    case 'UPDATE_QUANTITY':
    case 'CLEAR_CART':
    default:
      return state;
  }
}

const CartContext = React.createContext(null);

export const useCartContext = () => React.useContext(CartContext);

const initialState = {
  items: [],
};

function CartProvider({children}){
  const [state, dispatch] = React.useReducer(cartReducer, initialState);
  const { user } = useUserContext();

  React.useEffect(()=>{
    axios.get(`/cart/${user.id}`)
      .then((res) => {
        if(res.data.length)
          dispatch({ type: 'SET_ITEMS', payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateItem= (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };



  return (
    <CartContext.Provider value={{
      addItem,
      removeItem,
      updateItem,
      clearCart,
      state
    }} >
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider;
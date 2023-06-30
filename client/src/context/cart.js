
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
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: [...state.items.map( x=> ( x.id===action.payload.id ? action.payload : x ))],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: [...state.items.filter( x=> x.id !== action.payload )],
      };
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

  const addItem = React.useCallback((productId) => {
    axios.post('/cart',{ userId:user.id, productId, quantity:1})
    .then((res)=>{
      dispatch({ type: 'ADD_ITEM', payload: res.data });
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const removeItem = React.useCallback((itemId) => {
    axios.delete(`/cart/${itemId}`)
    .then((res)=>{
      if(res)
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const updateItem = React.useCallback((itemId, quantity) => {
    if(quantity > 0 ){
      axios.patch(`/cart/${itemId}`,{ quantity })
      .then((res)=>{
        dispatch({ type: 'UPDATE_QUANTITY', payload: res.data });
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else{
      removeItem(itemId)
    }
  },[])

  return (
    <CartContext.Provider value={{
      addItem,
      removeItem,
      updateItem,
      items: state.items
    }} >
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider;
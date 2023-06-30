import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function AddToCartButton({quantity, onAdd, onIncrease, onDecrease}) {
  const handleIncrease=()=>{
    onIncrease(quantity + 1);
  }
  const handleDecrease=()=>{
    if(quantity > 0){
      onDecrease(quantity - 1);
    }
  }
  return (
    <div className='d-flex' style={{zIndex:9}}>
      {quantity ? 
      <InputGroup >
        <Button variant="light" onClick={handleIncrease}>
          +
        </Button>
        <FormControl
          aria-label="Quantity"
          value={quantity}
          readOnly
          className="border-0 text-center"
        />
        <Button variant="light" onClick={handleDecrease}>
          -
        </Button>
      </InputGroup> :
      <Button className='flex-grow-1' variant="primary" onClick={onAdd} style={{zIndex:9}} >
        הוסף
      </Button> }
    </div>
  );
}

export default React.memo(AddToCartButton, (prev, next)=>(
  prev.quantity === next.quantity 
));

import React from 'react';
import axios from 'axios';
import { Card, Placeholder, Container, Col, Row, Ratio } from "react-bootstrap";
import FullSpinner from "../components/FullLoader";
import { useCartContext } from '../context/cart';
import AddToCart from '../components/AddToCart';

function Items({ products }) {
  const { addItem, updateItem, items } = useCartContext();
  return (
    <Row className="g-3">
      {products.map((item) => {
        const cartItem=items.find(x=>x.ProductId === item.id);
        return (
          <Col key={item.id} xs={12} md={6} lg={4} xxl={4}>
            <Card className='p-3 border-1'>
              <Ratio aspectRatio="16x9">
                {item.image ? (
                  <img
                    className="rounded"
                    src={item.image}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <Placeholder className="rounded" />
                )}
              </Ratio>
              <Card.Body>
                <Card.Title as="h4">
                  <div className="d-flex justify-content-between">
                    <span className="d-block fw-normal stretched-link">
                      {item.title}
                    </span>
                    <span>{`${item.price} שח`}</span>
                  </div>
                </Card.Title>
                <div className='mt-3'>
                  <AddToCart
                    onAdd={()=>addItem(item.id)}
                    quantity={cartItem ? cartItem.quantity : 0}
                    onIncrease={ q => updateItem(( cartItem ? cartItem.id : null), q) }
                    onDecrease={ q => updateItem(( cartItem ? cartItem.id : null), q) }
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  );
}


export default function Main(){
  const [ state, setState ] = React.useState({
    products:[],
    isLoading: true
  })
  React.useEffect(()=>{
    axios.get("/products",)
      .then((res) => {
        console.log(res);
        setState(p=>({
          ...p,
          isLoading:false,
          products:res.data
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return(
    <Container>
      {state.isLoading ?
       <FullSpinner /> : 
       <div className='my-4'>
          <Items products={state.products}/>
       </div>
      }
    </Container>
  )
}


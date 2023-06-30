import React from 'react';
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import { useCartContext } from '../context/cart';
import AddToCart from '../components/AddToCart';



export default function Cart(){
  const { addItem, updateItem, items, removeItem } = useCartContext();
  return(
    <Container>
      <Row key={-1} className="g-3 align-items-center mt-3 border-bottom pb-3 d-none d-md-flex" >
        <Col xs={12} md={1} lg={1} xxl={1}>
          <span className="d-block fw-normal stretched-link">
            {'תמונה'}
          </span>
        </Col>
        <Col>
          <span className="d-block fw-normal stretched-link">
            {'כותברת'}
          </span>
        </Col>
        <Col xs={12} md={2} lg={2} xxl={2}>
          <span className="d-block fw-normal stretched-link">
            {'מחיר ליחידה'}
          </span>
        </Col>
        <Col xs={12} md={2} lg={2} xxl={2}>
          <div className="d-flex justify-content-between">
            <span className="d-block fw-normal stretched-link">
              {'מחיר כולל'}
            </span>
          </div>
        </Col>
        <Col xs={12} md={2} lg={2} xxl={2}/>
        <Col xs={12} md={1} lg={1} xxl={1}>
          <span className="d-block fw-normal stretched-link">
            {'מחק'}
          </span>
        </Col>
      </Row>
      {items.map((item) => {
        const { Product } = item;
        return (
          <Row key={item.id} className="align-items-center  py-3" >
            <Col xs={12} md={1} lg={1} xxl={1}>
              <Image src={Product.image} thumbnail />
            </Col>
            <Col>
              <span className="d-block fw-normal stretched-link">
                {Product.title}
              </span>
            </Col>
            <Col xs={12} md={2} lg={2} xxl={2}>
              <div className="d-flex justify-content-between">
                <span>{`${Product.price} שח`}</span>
              </div>
            </Col>
            <Col xs={12} md={2} lg={2} xxl={2}>
              <div className="d-flex justify-content-between">
                <span>{`${(Product.price*item.quantity).toFixed(2)} שח`}</span>
              </div>
            </Col>
            <Col xs={12} md={2} lg={2} xxl={2}>
              <AddToCart
                onAdd={()=>addItem(item.id)}
                quantity={item.quantity}
                onIncrease={ q => updateItem(item.id, q) }
                onDecrease={ q => updateItem(item.id, q) }
              />
            </Col>
            <Col xs={12} md={1} lg={1} xxl={1} style={{zIndex:999}}>
              <Button variant="danger" onClick={()=>removeItem(item.id)}>
                x
              </Button>
            </Col>
          </Row>
        )
      })}

      
    </Container>
  )
}


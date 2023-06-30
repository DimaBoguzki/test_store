import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/auth';
import { useCartContext } from '../context/cart';

function Header() {
  const navigate = useNavigate();
  const { logOut } = useUserContext();
  const { items } = useCartContext();
  return (
    <header
      className="position-sticky top-0 shadow-sm fw-light" 
      style={{ zIndex: 50 }}
    >
      <div style={{background: "#f6f7f9", direction:'rtl'}}>
        <div className="d-flex flex-wrap align-items-center justify-content-between container py-4">
        <div className="d-flex align-items-center py-1">
          <button
            type="button"
            className="btn btn-link text-decoration-none"
            onClick={() => navigate('/')}
          >
            <i className="bi bi-app px-2"/>
            ראשי
          </button>
          <button
            type="button"
            className="btn btn-link text-decoration-none position-relative"
            onClick={() => navigate('/cart')}
          >
            <i className="bi bi-cart px-2"/>
            סל 
            {items.length ? <label 
              className="rounded-circle border bg-danger"
              style={{
                position:'absolute',
                bottom:20,
                right:5
              }}
            >
              <span className="badge badge-ligh">
                {items.length}
              </span>
            </label> : null}
          </button>
        </div>
          <button
            type="button"
            className="btn btn btn-outline-danger"
            onClick={logOut}
          >
            <i className="bi bi-box-arrow-right px-2" />
            <span className="d-none d-sm-inline-block">התנתק</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header, ()=>true);
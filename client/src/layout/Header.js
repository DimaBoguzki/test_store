import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../context/auth';

function Header() {
  const navigate = useNavigate();
  const { logOut } = useUserContext();

  return (
    <header
      className="position-sticky top-0 shadow-sm fw-light" 
      style={{ zIndex: 50 }}
    >
      <div style={{background: "#f6f7f9", direction:'rtl'}}>
        <div className="d-flex flex-wrap align-items-center justify-content-between container py-3">
        <div className="d-flex align-items-center py-3">
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
            
            className="btn btn-link text-decoration-none"
            onClick={() => navigate('/cart')}
          >
            <i className="bi bi-cart px-2" />
            סל
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
import * as React from "react";
import { useState } from "react";
import axios from 'axios';
import { Card, Form, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import { useUserContext, setToken, getAuthHeaderValue } from "../context/auth";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if(password!==rePassword){
      setError("הסיסמא לא תואמת");
      return;
    }
    setLoading(true);
    axios.post("/user/register",{ name, email, password})
      .then((res) => {
        setLoading(false);
        setToken(res.data.token);
        axios.defaults.headers.common.Authorization = getAuthHeaderValue(); 
        setUser({ 
          id: res.data.id,
          name: res.data.name,
          email: res.data.email
        });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          setError("שם המשתמש או הסיסמא לא נכונים");
        } 
        else {
          setError(`שגיאה (#${err.response.status }). צור קשר עם המנהל`);
        }
      });
      
  };


  return (
    <Container className="pt-5" style={{maxWidth:800}}>
      <Row>
        <Col>
          <Form method="post" onSubmit={onSubmit}>
          <Card className="shadow border-0">
            <Card.Body>
              <h1 className="display-6 fs-3 py-2 mb-3 text-center">
                הרשמה:
              </h1>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="visually-hidden">Name</Form.Label>
                <Form.Control
                  style={{direction:'ltr'}}
                  required
                  type="text"
                  size="lg"
                  placeholder="Name"
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className="visually-hidden">Username</Form.Label>
                <Form.Control
                  style={{direction:'ltr'}}
                  required
                  type="text"
                  size="lg"
                  placeholder="Email"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="visually-hidden">Password</Form.Label>
                <Form.Control
                  required
                  style={{direction:'ltr'}}
                  type={"password"}
                  size="lg"
                  placeholder="Password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="re-password">
                <Form.Label className="visually-hidden">Re Password</Form.Label>
                <Form.Control
                  required
                  style={{direction:'ltr'}}
                  type={"password"}
                  size="lg"
                  placeholder="re Password"
                  disabled={loading}
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Form.Group>
              {error && (
                <p className="mb-3 text-center text-danger">
                  <i className="bi bi-x-circle" /> {error}
                </p>
              )}
              <div className="d-grid mb-1">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                  disabled={loading}
                >
                  הרשם
                  {loading && (
                    <Spinner
                      animation="border"
                      className="me-2"
                      role="status"
                      size="sm"
                    />
                  )}
                </button>
              </div>
              <div className="d-grid mt-3">
              <Button variant="outline-primary" onClick={()=>navigate('/login')}>
                התחברות
              </Button>
            </div>
            </Card.Body>
          </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

import  React from "react";
import axios from 'axios';
import { Card, Form, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import { useUserContext, setToken, getAuthHeaderValue } from "../context/auth";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios.post("/user/login",{ email, password})
      .then((res) => {
        setLoading(false);
        setToken(res.data.token);
        axios.defaults.headers.common.Authorization = getAuthHeaderValue(); 
        setUser({ 
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
          throw new Error(err);
        }
      });
  };


  return (
    <Container className="pt-5" >
      <Row>
        <Col>
          <Form method="post" onSubmit={onSubmit}>
          <Card className="shadow border-0">
            <Card.Body>
              <h1 className="display-6 fs-3 py-2 mb-3 text-center">
                שלום! התחבר בבקשה:
              </h1>
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
                  התחבר
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
                <Button variant="outline-primary" onClick={()=>navigate('/register')}>
                  הרשמה
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

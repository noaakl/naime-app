import { useState, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from '../store/action';
import { useDispatch } from "react-redux";
import Styles from "../App.module.scss";
import { Form, Button, Card, Container } from 'react-bootstrap'

const Login = () => {
  const navigate = useNavigate();
  const navigateHome = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorWrong, setErrorWrong] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
    setErrorName(false);
    setErrorWrong(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    setErrorPassword(false);
    setErrorWrong(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '')
      setErrorName(true);
    else if (password === '')
      setErrorPassword(true);
    else {
      const login_data = {
        user_name: name,
        password: password
      }
      axios.post('/api/login', login_data)
        .then((response) => {
          dispatch(login(response.data))
          navigateHome()
        }).catch((error) => {
          console.log(error)
          if (error.response) {
            setErrorWrong(true)
          }
        })
    }
  };

  const successMessage = () => {
    return (
      <div className="success"
        style={{ display: submitted ? '' : 'none', }}>
        <br></br>
        <h5>User {name} successfully registered</h5>
      </div>
    );
  };
  const handleSubmitRefresh = (event) => {
    // Prevent page reload
    event.preventDefault();
  };

  const emptyName = () => {
    return (
      <div
        className="errorName"
        style={{
          display: errorName ? '' : 'none',
        }}>
        <h5 style={{ color: 'red', fontSize: '12px' }}>Please enter user name</h5>
      </div>
    );
  };

  const wrongPassName = () => {
    return (
      <div
        className="errorWrong"
        style={{
          display: errorWrong ? '' : 'none',
        }}>
        <h5 style={{ color: 'red', fontSize: '12px' }}>The Password or Username is incorrect. Please try again.</h5>
      </div>
    );
  };

  const emptyPassword = () => {
    return (
      <div
        className="errorPassword"
        style={{
          display: errorPassword ? '' : 'none',
        }}>
        <h5 style={{ color: 'red' }}>Please enter password</h5>
      </div>
    );
  };

  return (
    <div className={Styles.login} >
      <Container id={Styles.login}>
        <Card className="text-center" style={{ width: '40rem', margin: '20px', padding: '15px', position: "center", alignItems: "center", justifyContent: "center" }}>
          <Card.Body>
            <h3>Login</h3>
            <br></br>
            <div className="messages">
            </div>
            <Form onSubmit={handleSubmitRefresh} >
              <Form.Group className="mb-3" controlId="formUserName">

                <Form.Label className="label">User Name</Form.Label>
                <Form.Control placeholder="Enter User Name" onChange={handleName} className="input"
                  value={name} type="text" />
                {emptyName()}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={handlePassword} className="input"
                  value={password} />
                {emptyPassword()}
              </Form.Group>
              <Button variant="success" onClick={handleSubmit} className="btn" type="submit" style={{ marginBottom: '15px' }}>
                Submit
              </Button>
              {wrongPassName()}
              {successMessage()}
              <br></br>
              <h5 style={{ fontSize: '15px' }}>Not a memeber? <Link to={"/signup"}>CLICK HERE</Link> to sign up</h5>
            </Form>
          </Card.Body>

        </Card>

      </Container>
    </div>

  );
}
export default Login;


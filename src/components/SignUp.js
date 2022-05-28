import { useState } from 'react'
// import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Styles from "../App.module.scss";
import { Form, Button, Card, Container } from 'react-bootstrap'
import SuccessModal from './SuccessModal';

const SingUp = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNameNotTaken, setIsNameNotTaken] = useState(true);
  const isPasswordMatch = !confirmPassword || password === confirmPassword;
  const isEmailValid = String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const error = !username.length>2 || !firstName.length>2 || !lastName.length>2 || !isEmailValid || !password.length>6 || !isNameNotTaken || !isPasswordMatch;
  // const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const user_info = {
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }
    axios({
      method: "GET",
      url: `/api/signUpCheck?user_name=${username}`
    })
      .then((response) => {
        if (response.data.result === true) {
          setIsNameNotTaken(true)
          if (!error) {
            axios.post('/api/signUp', user_info)
              .then(() => setShowSuccessMessage(true))
              .catch(function (error) {
                console.log(error);
              });
          }
        }
        else {
          setIsNameNotTaken(false)
        }
      })
  };

  const handleFill = (e, setter) => {
    setter(e.target.value);
    if (setter === setUsername) {
      setIsNameNotTaken(true)
    }
  };

  const validateValue = (valueState, messege, chars_count) => {
    const validValue = chars_count ? valueState.length >= chars_count : valueState
    return (
      <div
        className="errorValue"
        style={{
          display: submitted && !validValue ? '' : 'none',
        }}>
        <h5 style={{ color: 'red', fontSize: '12px' }}>{messege}</h5>
      </div>
    );
  };

  return (
    <div className={Styles.signup} >
      <Container className="d-flex" id={Styles.signup}>
        <Card className="text-center h-100" style={{ width: '40rem', marginTop: '40px', marginBottom:'20px', padding: '15px', position: "center", alignItems: "center", justifyContent: "center" }}>
          <Card.Body>
            <h3>Sign Up</h3>
            <h5>sign up to keep track of your searches and ranks</h5>
            <br></br>
            <div className="messages">

            </div>
            {/* <Form onSubmit={handleSubmitRefresh} > */}
            <Form>

              <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label className="label">User Name</Form.Label>
                <Form.Control placeholder="Enter User Name" onChange={(e) => handleFill(e, setUsername)} className="input"
                  value={username} type="text" />
                {validateValue(username, "User name must contain atleat 2 characters", 2)}
                {validateValue(isNameNotTaken, "User Name already exist. Please try again")}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label className="label">First Name</Form.Label>
                <Form.Control placeholder="Enter First Name" onChange={(e) => handleFill(e, setFirstName)} className="input"
                  value={firstName} type="text" />
                {validateValue(firstName, "First name must contain atleat 2 characters", 2)}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label className="label">Last Name</Form.Label>
                <Form.Control placeholder="Enter Last Name" onChange={(e) => handleFill(e, setLastName)} className="input"
                  value={lastName} type="text" />
                {validateValue(lastName, "Last name must contain atleat 2 characters", 2)}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="label">E-Mail Address</Form.Label>
                <Form.Control placeholder="Enter E-Mail Address, e.g user@naime.com" onChange={(e) => handleFill(e, setEmail)} className="input"
                  value={email} type="text" />
                {/* {validateValue(email, "Please enter e-mail")} */}
                {validateValue(isEmailValid, "Please enter a valid E-Mail Address, e.g user@naime.com", 0)}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => handleFill(e, setPassword)} className="input"
                  value={password} />
                {validateValue(password, "Password must contain atleat 6 characters", 6)}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmationPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" onChange={(e) => handleFill(e, setConfirmPassword)} className="input"
                  value={confirmPassword} />
                {/* {validateValue(confirmPassword, "Please enter confirmation password")} */}
                {validateValue(isPasswordMatch, "Confirmation Password does't match the password. Please try again", 0)}
              </Form.Group>

              <Button variant="success" onClick={handleSubmit} className="btn" type="submit">
                Submit
              </Button>
              {/* {successMessage()} */}
            </Form>
            <br></br>
            <h5 style={{ fontSize: '15px' }}>If you already have an account click <Link to={"/login"}>HERE</Link> to login</h5>
          </Card.Body>
        </Card>
      </Container>

      <SuccessModal show={showSuccessMessage} username={username} />

    </div>

  );
}
export default SingUp;


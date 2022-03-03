import { useState } from 'react'
import axios from "axios";
import Styles from "./App.module.scss";
import {Form, Button, Card, Row, Col, Container} from 'react-bootstrap'

const SingUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorNameTaken, setErrorNameTaken] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const res = false;
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
        setErrorName(false);
        setErrorNameTaken(false);
      };
    
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
        setErrorPassword(false);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '')
            setErrorName(true);
        else if (password === '')
            setErrorPassword(true);
        else {
            const user_info = {
                user_name: name,
                password: password
            }
            axios({
                method: "GET",
                url: `/SignUpCheck?name=${name}`
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.result == true) {
                        console.log(response.data)
                        setSubmitted(true);
                        setErrorName(false);
                        setErrorPassword(false);
                        axios.post('/SignUp', user_info)
                            .catch(function (error) {
                                 console.log(error);});
                    }
                    else {
                        setErrorNameTaken(true);
                    }
    
                })
        }
      };
    
    const successMessage = () => {
        return (
          <div className="success"
            style={{display: submitted ? '' : 'none',}}>
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
            <h5 style={{color:'red', fontSize:'12px'}}>Please enter user name</h5>
          </div>
        );
      };

    const NameTaken = () => {
        return (
          <div
            className="errorNameTaken"
            style={{
              display: errorNameTaken ? '' : 'none',
            }}>
            <h5 style={{color:'red', fontSize:'12px'}}>User name already exist. Please enter again</h5>
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
            <h5 style={{color:'red', fontSize:'12px' }}>Please enter password</h5>
          </div>
        );
      };

    return (
        <div className={Styles.signup} >
    <Container className="d-flex h-100" id ={Styles.signup}>
    <Card className="text-center" style={{ width: '40rem', margin:'20px', padding:'15px', position:"center",alignItems:"center", justifyContent:"center" }}>
        <Card.Body>
            <h3>Sign Up</h3>
            <h5>sign up to keep track on your searches and ranks</h5>
            <br></br>
            <div className="messages">
        
      </div>
            <Form onSubmit={handleSubmitRefresh} > 
  <Form.Group className="mb-3" controlId="formUserName">
      
        <Form.Label className="label">User Name</Form.Label>
        <Form.Control placeholder="Enter User Name" onChange={handleName} className="input"
          value={name} type="text"/>
          {emptyName()}
          {NameTaken()}
    </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter Password" onChange={handlePassword} className="input"
          value={password} />
          {emptyPassword()}
  </Form.Group>
  <Button variant="success" onClick={handleSubmit} className="btn" type="submit">
    Submit
  </Button>
  {successMessage()}
</Form>
<br></br>
<h5 style={{fontSize:'15px'}}>If you already have an account click HERE to login</h5>
    </Card.Body>
    </Card>
      </Container>
       </div>

    );
}
export default SingUp;


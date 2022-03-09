import { useState } from 'react'
import { Form } from 'react-bootstrap'


const FormGroup = ({lable, placeholder, setter, value, errorMessege, submitted}) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameNotTaken, setIsNameNotTaken] = useState(true);
    // const isPasswordMatch = !confirmPassword || password === confirmPassword;
    // const isEmailValid = String(email).toLowerCase().match(
        // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // const error = !username || !firstName || !lastName || !email || !isEmailValid || !password || !confirmPassword || !isNameNotTaken || !isPasswordMatch;
    // const [submitted, setSubmitted] = useState(false);
    // const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        <Form.Group className="mb-3" controlId={`form ${lable}`}>
            <Form.Label className="label">lable</Form.Label>
            <Form.Control placeholder={placeholder} onChange={(e) => handleFill(e, setter)} className="input"
                value={value} type="text" />
            {validateValue(value, errorMessege)}
        </Form.Group>

    );
}
export default FormGroup;


import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [users,setUsers] = useState({});

    const handleChange = (e) => {
        setUsers({...users, [e.target.name]: e.target.value});
      };
      
      const submitForm = (e) => {
        e.preventDefault(); 
        dispatch(createUser(users)) // users mtlab form ka data 
        console.log("user",users)
        setUsers({})
        navigate("/read")
      };
      


  return (
    <div className="container mx-auto py-2">
      <center className="py-2">
      <h3>User Detail Form</h3>
      </center>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={handleChange} type="text" placeholder="Enter your name" value={users.name || ''} name="name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={handleChange} type="email" placeholder="Enter your email"  value={users.email || ''} name="email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Age</Form.Label>
          <Form.Control onChange={handleChange} type="number" placeholder="Enter your Age" value={users.age || ''} name="age" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="maleRadio"
              name="gender"
              label="Male"
              value="male"
              checked={users.gender === "male"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="femaleRadio"
              name="gender"
              label="Female"
              value="female"
              checked={users.gender === "female"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Home;

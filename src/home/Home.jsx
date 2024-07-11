import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    name: "",
    email: "",
    age: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });

    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!users.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!users.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(users.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!users.age) {
      newErrors.age = "Age is required";
      valid = false;
    } else if (users.age < 18 || users.age > 120) {
      newErrors.age = "Age must be between 18 and 120";
      valid = false;
    }

    if (!users.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(createUser(users));
      setUsers({
        name: "",
        email: "",
        age: "",
        gender: ""
      });
      navigate("/read");
    }
  };

  return (
    <div className="container mx-auto py-2 px-4">
      <center className="py-2">
        <h3>User Detail Form</h3>
      </center>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
            value={users.name}
            name="name"
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            value={users.email}
            name="email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="number"
            placeholder="Enter your Age"
            value={users.age}
            name="age"
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
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
              isInvalid={!!errors.gender}
            />
            <Form.Check
              type="radio"
              id="femaleRadio"
              name="gender"
              label="Female"
              value="female"
              checked={users.gender === "female"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Home;
